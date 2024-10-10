import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(): boolean {
    const user = this.userService.getUser();
    if (user) {
      return true;
    }
    void this.router.navigate([AppRoutingConstants.AUTH_PATH]);
    return false;
  }
}
