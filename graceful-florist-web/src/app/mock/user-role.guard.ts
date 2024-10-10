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
    private readonly userService: UserService
  ) {}

  canActivate(): boolean {
    const user = this.userService.getUser();
    if (user?.roles.includes(UserRole.USER)) {
      return true;
    }
    if (user?.roles.includes(UserRole.ADMIN)) {
      void this.router.navigate([AppRoutingConstants.ADMIN_PATH]);
    }
    if (user?.roles.includes(UserRole.STAFF)) {
      void this.router.navigate([AppRoutingConstants.STAFF_PATH]);
    }
    return false;
  }
}
