import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RestClient} from './rest.client';
import {AuthenticationRequest} from '../models';

@Injectable()
export class AuthenticationClient extends RestClient {
  constructor(httpClient: HttpClient) {
    super('', httpClient);
  }

  public authenticate(authenticationRequest: AuthenticationRequest): Observable<{}> {
    return this.post('/authentication', authenticationRequest);
  }

  public logout(token: string): Observable<{}> {
    return this.post('/logout', {token: token});
  }
}
