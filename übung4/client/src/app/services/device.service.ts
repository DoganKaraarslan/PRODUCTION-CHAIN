import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {AvailableDevice, Control, LogEntry} from '../models';
import {DeviceClient} from '../rest';
import '../models/arrow.model';
import '../models/device.model';

@Injectable()
export class DeviceService {
  private available: Subject<AvailableDevice[]>;
  private readonly devices: Subject<Device<any>[]>;
  private readonly arrows: Subject<Arrow[]>;
  private readonly logUpdates: Subject<LogUpdate<any>>;
  private connection: WebSocket;

  constructor(private readonly deviceClient: DeviceClient) {
    this.devices = new ReplaySubject();
    this.arrows = new ReplaySubject();

    this.deviceClient.getDevices().subscribe(data => {
      // Transform the server device list to the device objects needed for the diagram
      const devices = data.map(dev => new Device(dev.index, dev.position, dev.type, dev.title, dev.control));

      // Add arrows for all the successors in the server device list
      const arrows = data.reduce((result, dev) => {
        const device = devices.find(d => d.index === dev.index),
          successors = dev.successors.map(index => new Arrow(device, devices.find(d => d.index === index)));
        return result.concat(successors);
      }, []);

      this.devices.next(devices);
      this.arrows.next(arrows);
    });

    this.logUpdates = new Subject();

    // TODO Create a WebSocket and subscribe to incoming messages
    this.connection = new WebSocket("ws://localhost:8081/subscribe");
    this.connection.onopen = function (event) {
      var con = event.target as WebSocket;
    };
    this.connection.onmessage = event => {
      var data = JSON.parse(event.data);
      if (data.type == "error"){
        console.log("error on server");
      }else if(data.type == "success"){
        console.log("update successful")
      }
      else if (data.type == "data"){
        var index = JSON.parse(event.data).index;
        var value = JSON.parse(event.data).value;
        this.getDevice(index).subscribe(
            suc => {
                this.setDeviceValue(suc, value);
            }
          );

        console.log(event.data);
      }

    }

    this.connection.onclose = function () {
      console.info("close");
    };
  }

  getAvailable(): Observable<AvailableDevice[]> {
    if (!this.available) {
      this.available = new BehaviorSubject([]);
      this.deviceClient.getAvailable().subscribe(available => this.available.next(available));
    }
    return this.available;
  }

  getDevices(): Observable<Device<any>[]> {
    return this.devices;
  }

  getDevice(index: number): Observable<Device<any>> {
    return this.devices.map(devices => devices.find(d => d.index === index));
  }

  getDeviceCount(): Observable<number> {
    return this.devices.map(devices => devices.length);
  }

  getProductCount(): Observable<number> {

    var sum = 0;

    var endStorages = this.devices.map(devices => devices.filter(d => d.type === "end-storage"));

    endStorages.subscribe(val =>{
        for(let device of val){
          sum += device.control.current;
        };
      }
    );

    console.log(sum);

    return Observable.of(sum);

  }

  addDevice(device: Device<any>): void {
    this.devices.first().subscribe(devices => {
      devices.push(device);
      this.devices.next(devices);
    });

    this.deviceClient.addDevice({
      index: device.index,
      type: device.type,
      title: device.title,
      control: device.control,
      position: device.getPosition()
    }).subscribe();
  }

  deleteDevice(device: Device<any>): void {
    this.devices.first().subscribe(devices => {
      const index = devices.indexOf(device);
      if (index >= 0) {
        devices.splice(index, 1);
      }
      this.devices.next(devices);
    });

    this.deviceClient.deleteDevice(device).subscribe();
  }

  moveDevice(device: Device<any>): void {
    this.deviceClient.moveDevice(device).subscribe();
  }

  getLogUpdates(): Observable<LogUpdate<any>> {
    return this.logUpdates;
  }

  updateDevice<T>(device: Device<Control<T>>, value: T): void {
    // TODO Send updated values to server via WebSocket
    this.connection.send(JSON.stringify({device: device, value: value}));
    this.setDeviceValue(device, value);
  }

  private setDeviceValue<T>(device: Device<Control<T>>, value: T): void {
    const logEntry = {
      date: new Date(),
      oldValue: device.control.current,
      newValue: value
    };

    device.control.log.push(logEntry);
    device.control.current = value;
    device.updateDevice();

    this.logUpdates.next({device, logEntry});
  }

  getArrows(): Observable<Arrow[]> {
    return this.arrows;
  }

  getArrowCount(): Observable<number> {
    return this.arrows.map(arrows => arrows.length);
  }

  addArrow(arrow: Arrow): void {
    this.arrows.first().subscribe(arrows => {
      arrows.push(arrow);
      this.arrows.next(arrows);
    });

    this.deviceClient.addArrow(arrow).subscribe();
  }

  deleteArrow(arrow: Arrow): void {
    this.arrows.first().subscribe(arrows => {
      const index = arrows.indexOf(arrow);
      if (index >= 0) {
        arrows.splice(index, 1);
      }
      this.arrows.next(arrows);
    });

    this.deviceClient.deleteArrow(arrow).subscribe();
  }
}

interface LogUpdate<T> {
  device: Device<Control<T>>;
  logEntry: LogEntry<T>;
}
