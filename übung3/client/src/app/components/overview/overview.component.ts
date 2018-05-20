import {Component} from '@angular/core';
import '../../models/arrow.model';
import { HttpClient } from '@angular/common/http';
import { DiagramService }  from '../../services/diagram.service';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent {

  deviceCounter: number;
  arrowCounter: number;

  constructor(private diagramService: DiagramService) {
  }

  ngOnInit(){
    this.deviceCounter = 10;
    this.arrowCounter = this.diagramService.arrows.length;
  }


}
