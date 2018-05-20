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


  ngOnInit() {


    this.http.get<AvailableDevices>('http://localhost:8081/getAvailable').subscribe(resp => {

      this.devices = resp.devices;

    });


    }


}
