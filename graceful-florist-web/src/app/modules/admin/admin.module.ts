import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TotalCardComponent} from './components/total-card/total-card.component';
import {CreateProductModalComponent} from './components/create-product-modal/create-product-modal.component';
import {ProductsManagementComponent} from './components/products-management/products-management.component';
import {AdminComponent} from './components/admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TotalCardComponent,
    CreateProductModalComponent,
    ProductsManagementComponent,
    AdminComponent
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule]
})
export class AdminModule {}
