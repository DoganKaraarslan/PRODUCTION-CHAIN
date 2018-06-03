import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders} from '@angular/common/http'

import 'rxjs/add/operator/map';
import '../models/customresponse.model';
import 'rxjs/add/observable/of';


import {AuthenticationClient} from '../rest';
import {SessionStorageService} from './session-storage.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly restClient: AuthenticationClient, private readonly sessionStorageService: SessionStorageService) {
  }

  get isLoggedIn(): boolean {
    return this.sessionStorageService.loggedIn;
  }

  login(username: string, password: string): Observable<{}> {
    var res = this.restClient.authenticate({username: username, password: password});

    res.subscribe(val => {
      console.log(val);
      if(val["state"] === 200){
        this.sessionStorageService.writeToken(val["token"]);
      }
    });

    return res;
  }

  logout(): Promise<boolean> {
    var headers = this.sessionStorageService.getTokenHeader();
    var res = this.restClient.logout(headers);

    this.sessionStorageService.removeToken();

    return res.toPromise().then(val => {
      console.log(val);
      if(val["status"] === 200){
        this.sessionStorageService.removeToken();
        return true;
      }else{
        return false;
      }
    });


  }

}
