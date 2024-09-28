import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProductsManagementComponent} from './components/products-management/products-management.component';
import {AppRoutingConstants} from '../../app-routing-constants';
import {AdminComponent} from './components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: AppRoutingConstants.DASHBOARD_PATH, component: DashboardComponent},
      {
        path: AppRoutingConstants.PRODUCTS_MANAGEMENT_PATH,
        component: ProductsManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
