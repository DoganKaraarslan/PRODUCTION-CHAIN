import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import '../models/customresponse.model';


import {RestClient} from './rest.client';
import {AuthenticationRequest} from '../models';

@Injectable()
export class AuthenticationClient extends RestClient {
  constructor(httpClient: HttpClient) {
    super('/authentication', httpClient);
  }

  public authenticate(authenticationRequest: AuthenticationRequest): Observable<CustomResponse> {
    return this.post(null, authenticationRequest);
  }
}
