import {Injectable} from '@angular/core';

@Injectable()
export class SessionStorageService {
  private _loggedIn: boolean;

  constructor() {
    this._loggedIn = !!localStorage.getItem('loggedIn');
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  setLoggedIn(loggedIn: boolean): void {
    this._loggedIn = loggedIn;
    if (loggedIn) {
      localStorage.setItem('loggedIn', 'true');
    } else {
      localStorage.removeItem('loggedIn');
    }
  }
}
