import {NgModule} from '@angular/core';
import {StaffComponent} from './staff.component';
import {SharedModule} from '../shared/shared.module';
import {StaffRoutingModule} from './staff-routing.module';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';

@NgModule({
  declarations: [StaffComponent, MyOrderComponent, PendingOrdersComponent],
  imports: [StaffRoutingModule, SharedModule]
})
export class StaffModule {}
