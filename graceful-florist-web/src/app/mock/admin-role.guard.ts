import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';
import {UserRole, UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(): boolean {
    const user = this.userService.getUser();
    if (user?.roles.includes(UserRole.ADMIN)) {
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
