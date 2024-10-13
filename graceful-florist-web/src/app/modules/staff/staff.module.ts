import {NgModule} from '@angular/core';
import {StaffComponent} from './staff.component';
import {SharedModule} from '../shared/shared.module';
import {StaffRoutingModule} from './staff-routing.module';
import {MyOrderComponent} from './components/my-order/my-order.component';
import {PendingOrdersComponent} from './components/pending-orders/pending-orders.component';
import {CommonModule} from '@angular/common';
import {StaffOrderDetailComponent} from './components/staff-order-detail/staff-order-detail.component';

@NgModule({
  declarations: [
    StaffComponent,
    MyOrderComponent,
    PendingOrdersComponent,
    StaffOrderDetailComponent
  ],
  imports: [CommonModule, SharedModule, StaffRoutingModule]
})
export class StaffModule {}
