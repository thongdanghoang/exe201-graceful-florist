import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';
import {UserService} from './mock-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly mockUserService: UserService
  ) {}

  canActivate(): boolean {
    const user = this.mockUserService.getUser();
    if (user && user.role === 'admin') {
      return true;
    }
    if (user) {
      void this.router.navigate([AppRoutingConstants.HOME_PATH]);
    } else {
      void this.router.navigate([AppRoutingConstants.AUTH_PATH]);
    }
    return false;
  }
}
