// src/app/interceptors/token.interceptor.ts
import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    if (token && req.url.startsWith('http://localhost:8080/api')) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
