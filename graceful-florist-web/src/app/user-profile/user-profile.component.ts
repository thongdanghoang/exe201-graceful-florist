import {Component} from '@angular/core';
import {BreadcrumbItem} from '../modules/shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../app-routing-constants';

@Component({
  selector: 'graceful-florist-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Quản lý tài khoản'}
  ];
}
