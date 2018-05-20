import {Injectable} from '@angular/core';

import '../models/arrow.model';
import '../models/device.model';

@Injectable()
export class DiagramService {
  devices: Device[] = [];
  arrows: Arrow[] = [];

  constructor(/* TODO inject other services or core classes if necessary */) {
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

    for(let arrow of this.arrows){

    }

    var index = this.devices.indexOf(device);
    if (index > -1) {
      this.devices.splice(index, 1);
    }



  }

  onDeviceDetails(device: Device<any>): void {
    // TODO navigate to the details view for the given device

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
