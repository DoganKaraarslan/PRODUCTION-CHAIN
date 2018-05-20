import {Component} from '@angular/core';
import {AvailableDevice, Control, AvailableDevices} from '../../models/';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  devices : AvailableDevice[];

  constructor(private http: HttpClient) {
  }

  /*
  "title": "3D-Drucker",
  "type": "item-generator",
  "image": "images/item_generator.svg",
  "control": {
    "title": "Produktfortschritt einstellen",
    "type": "enum",
    "values": [
      "Unfertig",
      "Teilweise fertig",
      "Fertig"
    ]
    */

  ngOnInit() {


    this.http.get<AvailableDevices>('http://localhost:8081/getAvailable').subscribe(resp => {

      this.devices = resp.devices;

    });


    }


}
