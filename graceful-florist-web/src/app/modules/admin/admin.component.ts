import {Component, EventEmitter, OnInit} from '@angular/core';
import {MenuItem} from '../shared/components/sidebar/sidebar.component';
import {AppRoutingConstants} from '../../app-routing-constants';
import {NavigationEnd, Router} from '@angular/router';
import {SubscriptionAwareComponent} from '../core/subscription-aware.component';
import {UserService} from '../../mock/user.service';

@Component({
  selector: 'graceful-florist-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  menuItems: MenuItem[] = [
    {
      id: AppRoutingConstants.DASHBOARD_PATH,
      name: 'Trang chủ'
    },
    {
      id: AppRoutingConstants.PRODUCTS_MANAGEMENT_PATH,
      name: 'Sản phẩm'
    },
    {
      id: AppRoutingConstants.ORDERS_MANAGEMENT_PATH,
      name: 'Đơn hàng'
    },
    {
      id: AppRoutingConstants.CLASSIFICATIONS_PATH,
      name: 'Phân loại'
    },
    {
      id: AppRoutingConstants.USERS_MANAGEMENT,
      name: 'Nhân viên'
    },
    {
      id: AppRoutingConstants.LOGOUT,
      name: 'Đăng xuất'
    }
  ];
  readonly selectedTab: EventEmitter<string> = new EventEmitter<string>(false);

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const urlSegments = event.urlAfterRedirects.split('/');
          const currentId = urlSegments[2];
          this.selectedTab.emit(
            this.menuItems.find(item => item.id === currentId)?.id ||
              AppRoutingConstants.DASHBOARD_PATH
          );
        }
      })
    );
  }

  onTabChanged(tab: string): void {
    if (tab === AppRoutingConstants.LOGOUT) {
      this.userService.clearUser();
      void this.router.navigate([AppRoutingConstants.AUTH_PATH]);
      return;
    }
    void this.router.navigate([`${AppRoutingConstants.ADMIN_PATH}/${tab}`]);
  }
}
