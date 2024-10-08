import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProductsManagementComponent} from './components/products-management/products-management.component';
import {AppRoutingConstants} from '../../app-routing-constants';
import {AdminComponent} from './admin.component';
import {OrdersManagementComponent} from './components/orders-management/orders-management.component';
import {AdminOrderDetailComponent} from './components/admin-order-detail/admin-order-detail.component';
import {CategoriesManagementComponent} from './components/categories-management/categories-management.component';
import {UsersManagementComponent} from './components/users-management/users-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: AppRoutingConstants.DASHBOARD_PATH, component: DashboardComponent},
      {
        path: AppRoutingConstants.PRODUCTS_MANAGEMENT_PATH,
        component: ProductsManagementComponent
      },
      {
        path: AppRoutingConstants.ORDERS_MANAGEMENT_PATH,
        component: OrdersManagementComponent
      },
      {
        path: `${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}/:id`,
        component: AdminOrderDetailComponent
      },
      {
        path: AppRoutingConstants.CLASSIFICATIONS_PATH,
        component: CategoriesManagementComponent
      },
      {
        path: AppRoutingConstants.USERS_MANAGEMENT,
        component: UsersManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
