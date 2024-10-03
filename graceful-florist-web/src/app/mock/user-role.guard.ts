import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';
import {UserRole, UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly mockUserService: UserService
  ) {}

  canActivate(): boolean {
    const user = this.mockUserService.getUser();
    if (user?.roles.includes(UserRole.USER)) {
      return true;
    }
    if (user) {
      void this.router.navigate([AppRoutingConstants.ADMIN_PATH]);
    } else {
      void this.router.navigate([AppRoutingConstants.AUTH_PATH]);
    }
    return false;
  }
}
