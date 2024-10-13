import {NgModule} from '@angular/core';
import {StaffComponent} from './staff.component';
import {SharedModule} from '../shared/shared.module';
import {StaffRoutingModule} from './staff-routing.module';
import {MyOrderComponent} from './components/my-order/my-order.component';
import {PendingOrdersComponent} from './components/pending-orders/pending-orders.component';
import {DatePipe, NgClass, NgIf} from '@angular/common';

@NgModule({
  declarations: [StaffComponent, MyOrderComponent, PendingOrdersComponent],
  imports: [StaffRoutingModule, SharedModule, DatePipe, NgIf, NgClass]
})
export class StaffModule {}
