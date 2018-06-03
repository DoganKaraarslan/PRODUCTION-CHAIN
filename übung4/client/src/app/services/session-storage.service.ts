import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http'


@Injectable()
export class SessionStorageService {
  private _loggedIn: boolean;

  private token_name = "access_token";

  private token: string = null;

  constructor() {
    this.readToken();
  }

  readToken(): string{
    var token = localStorage.getItem(this.token_name);

    if(token){
      this.token = token;
    }

    if(this.token != null){
      this._loggedIn = true;
    }else{
      this._loggedIn = false;
    }

    return this.token;
  }

  writeToken(token:string){
    this.token = token;
    localStorage.setItem(this.token_name, this.token);
    this._loggedIn = true;
  }

  removeToken(){
    localStorage.removeItem(this.token_name);
    this._loggedIn = false;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }


  getTokenHeader(): HttpHeaders {
    if (this.token == null) {
      return null;
    }
    /*var current_time = new Date().getTime() / 1000;
    if(current_time < this.token.exp){
      this.router.navigate(['/login']);
    }*/
    var headers = new HttpHeaders();
    headers =  headers.append("Authorization", "Bearer " + this.token);
    headers = headers.set("withCredentials", "true");
    return headers;
  }

}
