import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {AppRoutingConstants} from './app-routing-constants';
import {AuthenticatedGuard} from './mock/authenticated-guard.service';
import {AdminRoleGuard} from './mock/admin-role.guard';
import {UserRoleGuard} from './mock/user-role.guard';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [UserRoleGuard]
  },
  {
    path: AppRoutingConstants.HOME_PATH,
    component: HomepageComponent,
    canActivate: [UserRoleGuard]
  },
  {
    path: AppRoutingConstants.USER_PROFILE,
    component: UserProfileComponent,
    canActivate: [UserRoleGuard]
  },
  {
    path: AppRoutingConstants.USER_ORDERS,
    component: UserOrdersComponent,
    canActivate: [UserRoleGuard]
  },
  {
    path: AppRoutingConstants.SUBSCRIPTIONS_PATH,
    component: SubscriptionsComponent,
    canActivate: [UserRoleGuard]
  },
  {
    // TODO: Add a 403 page instead homepage
    path: AppRoutingConstants.FORBIDDEN_PATH,
    component: HomepageComponent,
    canActivate: [UserRoleGuard]
  },
  {
    path: AppRoutingConstants.DEV_PATH,
    loadChildren: () =>
      import('./modules/dev/dev.module').then(m => m.DevModule),
    canActivate: [AuthenticatedGuard, AdminRoleGuard]
  },
  {
    path: AppRoutingConstants.ORDERS_PATH,
    loadChildren: () =>
      import('./modules/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthenticatedGuard, UserRoleGuard]
  },
  {
    path: AppRoutingConstants.PAYMENT_PATH,
    loadChildren: () =>
      import('./modules/payment/payment.module').then(m => m.PaymentModule),
    canActivate: [AuthenticatedGuard, UserRoleGuard]
  },
  {
    path: AppRoutingConstants.PRODUCTS_PATH,
    loadChildren: () =>
      import('./modules/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthenticatedGuard, UserRoleGuard]
  },
  {
    path: AppRoutingConstants.CART_PATH,
    loadChildren: () =>
      import('./modules/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthenticatedGuard, UserRoleGuard]
  },
  {
    path: AppRoutingConstants.AUTH_PATH,
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: AppRoutingConstants.ADMIN_PATH,
    loadChildren: () =>
      import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthenticatedGuard, AdminRoleGuard]
  },
  {
    path: AppRoutingConstants.STAFF_PATH,
    loadChildren: () =>
      import('./modules/staff/staff.module').then(m => m.StaffModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    // TODO: Add a 404 page instead homepage
    path: '**',
    component: HomepageComponent,
    canActivate: [UserRoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
