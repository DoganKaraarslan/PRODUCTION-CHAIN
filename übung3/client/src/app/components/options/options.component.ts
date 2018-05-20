import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {PasswordChangeRequest} from '../../models/password.change.request';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html'
})
export class OptionsComponent {

  displayCurrent: boolean = false;
  displayNew: boolean = false;
  passwords: PasswordChangeRequest = {oldPassword : "", newPassword : ""};


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) : void{
    //alert("Weiterschicken an Server zum Ändern -> ergebnis als Alert anzeigen.");
    if(this.compare(form)) {
        this.displayNew = false;
        this.http.post('http://localhost:8081/changePassword', this.passwords, {responseType: 'text'}).subscribe(resp => {
          if (eval(resp)){
            this.displayCurrent = false;
            alert("Passwort erfolgreich geändert.");
          }else{
            this.displayCurrent = true;
          }
        });
    } else {
        this.displayNew = true;
    }
  }


    compare(form: NgForm): boolean {
      return form.value["confirmPassword"] === form.value["password"];
    }




}
