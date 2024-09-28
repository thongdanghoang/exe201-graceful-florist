import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TotalCardComponent} from './components/total-card/total-card.component';
import {ProductDetailModalComponent} from './components/product-detail-modal/product-detail-modal.component';
import {ProductsManagementComponent} from './components/products-management/products-management.component';
import {AdminComponent} from './admin.component';
import {OrdersManagementComponent} from './components/orders-management/orders-management.component';
import {CategoriesManagementComponent} from './components/categories-management/categories-management.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TotalCardComponent,
    ProductDetailModalComponent,
    ProductsManagementComponent,
    AdminComponent,
    OrdersManagementComponent,
    CategoriesManagementComponent
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule]
})
export class AdminModule {}
