import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;


  login(): Observable<boolean> {
      return of(true).pipe(
        delay(1000),
        tap(val => localStorage.setItem("loggedIn", "true"))
      );
    }

  logout(): void {
    localStorage.setItem("loggedIn", "false");
  }


  isLoggedIn(): boolean {
    return eval(localStorage.getItem("loggedIn"));
  }
}
