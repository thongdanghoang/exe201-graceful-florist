import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    if (token && req.url.includes(AppRoutingConstants.BACKEND_API_URL)) {
      const decodedToken = this.userService.decodeToken(token);
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        this.userService.clearUser();
        void this.router.navigate([`${AppRoutingConstants.AUTH_PATH}`]);
        return throwError('Token expired');
      }

      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
