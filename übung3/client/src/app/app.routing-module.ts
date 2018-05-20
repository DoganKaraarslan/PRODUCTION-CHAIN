import { NgModule }             from '@angular/core';
import {LoginComponent, OptionsComponent, OverviewComponent, NavComponent, DetailsComponent} from './components';
import {AuthGuard, AuthService} from './services';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'options',
    component: OptionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'details',
    component: DetailsComponent,
    canActivate: [AuthGuard]
  },
  { path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  }
];






@NgModule({
  imports: [
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AppRoutingModule {
}
