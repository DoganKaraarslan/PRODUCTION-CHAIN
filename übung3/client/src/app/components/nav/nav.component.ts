import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OptionsComponent} from "../options/options.component";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    };

    isOptionsShown(): boolean {
      return !this.isOptionsite() && !this.isLoginSite();
    }

    isLogoutShown(): boolean {
      return !this.isLoginSite();
    }


    isOptionsite(): boolean {
      return this.route.component === OptionsComponent;
    }


    isLoginSite(): boolean {
      return this.route.component === LoginComponent;
    }
}
