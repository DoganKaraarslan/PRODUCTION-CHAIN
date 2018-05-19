import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OptionsComponent} from "../options/options.component";
import {LoginComponent} from "../login/login.component";
import { AuthService }  from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

    dontShow: string = 'display:none;';

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
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
      return this.router.url === '/login';

    }


    logout():void {
        this.authService.logout();
    }
}
