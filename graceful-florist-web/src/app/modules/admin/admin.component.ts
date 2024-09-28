import {Component} from '@angular/core';
import {MenuItem} from '../shared/components/sidebar/sidebar.component';
import {AppRoutingConstants} from '../../app-routing-constants';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'graceful-florist-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
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
      id: AppRoutingConstants.SETTINGS_PATH,
      name: 'Cài đặt'
    },
    {
      id: AppRoutingConstants.LOGOUT,
      name: 'Đăng xuất'
    }
  ];
  selectedTab: string = AppRoutingConstants.DASHBOARD_PATH;

  constructor(private readonly router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects.split('/').pop();
        this.selectedTab =
          this.menuItems.find(item => item.id === currentUrl)?.id ||
          AppRoutingConstants.DASHBOARD_PATH;
      }
    });
  }

  onTabChanged(tab: string): void {
    if (tab === AppRoutingConstants.LOGOUT) {
      return;
    }
    void this.router.navigate([`${AppRoutingConstants.ADMIN_PATH}/${tab}`]);
  }
}
