import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* Para jwt por cookie con withCredentials inserta las cookies en las peticiones automáticamente
    req = req.clone({
      withCredentials: true,
    });
    */

    /*jwt por Authorization Bearer token en header*/
    const user = this.storageService.getUser();
    if (user && Object.keys(user).length) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` }
      });
    }
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
