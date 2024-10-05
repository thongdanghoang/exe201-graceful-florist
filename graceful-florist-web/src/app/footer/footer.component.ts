import {Component} from '@angular/core';
import {UserRole, UserService} from '../mock/user.service';

@Component({
  selector: 'graceful-florist-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  protected readonly UserRole = UserRole;

  constructor(private readonly userService: UserService) {}

  protected get userRoles(): string[] {
    return this.userService.getUser()?.roles ?? [];
  }
}
