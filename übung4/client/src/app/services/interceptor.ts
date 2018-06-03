import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(public sessionStorageService: SessionStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.sessionStorageService.readToken()}`
      }
    });

    return next.handle(request);
  }
}
