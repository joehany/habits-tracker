import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent ,HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Token ${currentUser.token}`
            }
        });
    }

    return next.handle(request);
  }

}
