import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {AppComponent, AvailableDeviceComponent, DiagramComponent, Test1Component, Test2Component, LoginComponent, OptionsComponent} from './components';
import {DiagramService} from './services';
import {MaxValidator, MinValidator} from './validators';

import { RouterModule, Routes } from '@angular/router';



const appRoutes: Routes = [
  {
    path: 'test1',
    component: Test1Component
  },
  { path: 'test2',
    component: Test2Component
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'options',
    component: OptionsComponent
  }
];



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    )
  ],
  declarations: [
    AppComponent,
    AvailableDeviceComponent,
    DiagramComponent,
    Test1Component,
    Test2Component,
    LoginComponent,
    OptionsComponent,
    MaxValidator,
    MinValidator
  ],
  providers: [
    DiagramService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
