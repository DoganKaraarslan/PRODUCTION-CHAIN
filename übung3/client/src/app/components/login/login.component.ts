import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { AuthService }  from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

    display: boolean = false;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
  }

    onSubmit(form: NgForm) : void {


      this.authService.login().subscribe(() => {

        if (this.authService.isLoggedIn()) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/overview';

          // Redirect the user
          this.router.navigate([redirect]);
        }

      });

    }

    validate(form: NgForm) : boolean {
        //form.value["password"] == undefined bevor seite komplett geladen ist?
        return form.value["password"] != undefined && form.valid;
    }
}
