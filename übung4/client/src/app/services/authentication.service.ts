import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import '../models/customresponse.model';


import {AuthenticationClient} from '../rest';
import {SessionStorageService} from './session-storage.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly restClient: AuthenticationClient, private readonly sessionStorageService: SessionStorageService) {
  }

  get isLoggedIn(): boolean {
    return this.sessionStorageService.loggedIn;
  }

  login(username: string, password: string): Observable<CustomResponse> {
    var response = this.restClient.authenticate({
      username: username, password: password
    });

    response.subscribe(val => {
      console.log(val.message);
      console.log(val.token);
    });

    return response;
  }

  logout(): void {
    this.sessionStorageService.setLoggedIn(false);
  }

}
