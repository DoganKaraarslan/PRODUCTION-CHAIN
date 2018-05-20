import {Component} from '@angular/core';
import {AvailableDevice, Control, AvailableDevices} from '../../models/';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  devices : AvailableDevice[];
  test: AvailableDevice;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {


    this.http.get<AvailableDevices>('http://localhost:8081/getAvailable').subscribe(resp => {

      //array einträge von resp.devices können nicht direkt abgebildet werden auf AvailableDevice[]
      this.devices = resp.devices;
      this.test = resp.devices[0];



      console.log(resp.devices);

    });


    }


}
