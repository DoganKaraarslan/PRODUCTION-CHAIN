import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

    display: boolean = false;

    constructor(private router: Router) {
    }

    ngOnInit() {
  }

    onSubmit(form: NgForm) : void {
        //this.display = true;
        this.router.navigate(['/overview']);
    }
}
