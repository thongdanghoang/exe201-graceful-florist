import {Component, EventEmitter} from '@angular/core';
import {MenuItem} from '../shared/components/sidebar/sidebar.component';
import {AppRoutingConstants} from '../../app-routing-constants';
import {Router} from '@angular/router';
import {UserService} from '../../mock/user.service';
import {SubscriptionAwareComponent} from '../core/subscription-aware.component';

@Component({
  selector: 'graceful-florist-staff',
  templateUrl: './staff.component.html'
})
export class StaffComponent extends SubscriptionAwareComponent {
  readonly selectedTab: EventEmitter<string> = new EventEmitter<string>(false);
  menuItems: MenuItem[] = [
    {
      id: AppRoutingConstants.STAFF_ORDERS_PATH,
      name: 'Đơn của tôi'
    },
    {
      id: AppRoutingConstants.STAFF_PENDING_ORDERS_PATH,
      name: 'Đơn chờ xử lý'
    },
    {
      id: AppRoutingConstants.LOGOUT,
      name: 'Đăng xuất'
    }
  ];

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    super();
  }

  onTabChanged(tab: string): void {
    if (tab === AppRoutingConstants.LOGOUT) {
      this.userService.clearUser();
      void this.router.navigate([AppRoutingConstants.AUTH_PATH]);
      return;
    }
    void this.router.navigate([`${AppRoutingConstants.STAFF_PATH}/${tab}`]);
  }
}
