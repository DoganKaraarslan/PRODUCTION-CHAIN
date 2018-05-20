import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { NgZone } from '@angular/core';

import '../models/arrow.model';
import '../models/device.model';

@Injectable()
export class DiagramService {
  devices: Device<any>[] = [];
  arrows: Arrow[] = [];

  constructor(private router: Router, private zone: NgZone) {
  }

  initDevices(func: (device: Device<any>) => void): void {
    // TODO execute func for each of the already existing devices

    for(let device of this.devices){
      func(device);
    }

  }

  initArrows(func: (arrow: Arrow) => void): void {
    // TODO execute func for each of the already existing arrows

    for(let arrow of this.arrows){
      func(arrow);
    }
  }

  afterDeviceAdd(device: Device<any>): void {
    // TODO add the device to some list
    this.devices.push(device);

  }

  afterDeviceDelete(device: Device<any>): void {
    // TODO remove the device from that list

    var index = this.devices.indexOf(device);
    if (index > -1) {
      this.devices.splice(index, 1);
    }



  }

  onDeviceDetails(device: Device<any>): void {
    // TODO navigate to the details view for the given device
    //console.log('AJDHASHDJSHDJSHJHJ  ' + device.control.type);
    this.zone.run(() => {this.router.navigate(['details'])});
  }

  afterArrowAdd(arrow: Arrow): void {
    // TODO add the arrow to some list
    this.arrows.push(arrow);
  }

  afterArrowDelete(arrow: Arrow): void {
    // TODO remove the arrow from that list

    var index = this.arrows.indexOf(arrow);
    if (index > -1) {
      this.arrows.splice(index, 1);
    }

  }
}
