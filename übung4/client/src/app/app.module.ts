import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {AppRoutingModule} from './app-routing.module';
import {
  AppComponent,
  AvailableDeviceComponent,
  BooleanControlComponent,
  ContinuousControlComponent,
  DeviceDetailsComponent,
  DiagramComponent,
  EnumControlComponent,
  NavigationComponent,
  LoginComponent,
  OverviewComponent,
  OptionsComponent
} from './components';
import {AuthGuard} from './guards';
import {AuthenticationClient, DeviceClient, PasswordClient} from './rest';
import {AuthenticationService, DeviceService, DiagramService, SessionStorageService, UserService, Interceptor} from './services';
import {ConfirmValidator, MaxValidator, MinValidator} from './validators';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AvailableDeviceComponent,
    DiagramComponent,
    NavigationComponent,
    LoginComponent,
    OverviewComponent,
    OptionsComponent,
    DeviceDetailsComponent,
    BooleanControlComponent,
    ContinuousControlComponent,
    EnumControlComponent,
    ConfirmValidator,
    MaxValidator,
    MinValidator
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    AuthGuard,
    AuthenticationClient,
    DeviceClient,
    PasswordClient,
    AuthenticationService,
    DeviceService,
    DiagramService,
    SessionStorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
