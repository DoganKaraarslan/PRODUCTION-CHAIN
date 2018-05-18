import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html'
})
export class OptionsComponent {

  compare(form: NgForm): boolean {
    return form.value["confirmPassword"] === form.value["password"];
  }

  onSubmit(form: NgForm) : void{
    alert("Weiterschicken an Server zum Ändern -> ergebnis als Alert anzeigen.");
  }
}
