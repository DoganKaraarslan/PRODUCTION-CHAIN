import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OptionsComponent} from "../options/options.component";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

    dontShow: string = 'display:none;';

    constructor(private router: Router, private route: ActivatedRoute) {
    };

    isOptionsShown(): boolean {
      return !this.isOptionsite() && !this.isLoginSite();
    }

    isLogoutShown(): boolean {
      return !this.isLoginSite();
    }

    isOverviewShown(): boolean {
        return !this.isOverviewSite() && !this.isLoginSite();
    }

    isOptionsite(): boolean {
      //return this.route.component === OptionsComponent;
      return this.router.url === '/options';
    }

    isOverviewSite(): boolean {
        return this.router.url === '/overview';
    }


    isLoginSite(): boolean {
      //return this.route.component === LoginComponent;
      //console.log(this.router.url);
      return this.router.url === '/login';

    }
}
