import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StaffComponent} from './staff.component';
import {AppRoutingConstants} from '../../app-routing-constants';
import {MyOrderComponent} from './components/my-order/my-order.component';
import {PendingOrdersComponent} from './components/pending-orders/pending-orders.component';
import {StaffOrderDetailComponent} from './components/staff-order-detail/staff-order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: `${AppRoutingConstants.STAFF_ORDERS_PATH}/:id`,
        component: StaffOrderDetailComponent
      },
      {
        path: AppRoutingConstants.STAFF_ORDERS_PATH,
        component: MyOrderComponent
      },
      {
        path: AppRoutingConstants.STAFF_PENDING_ORDERS_PATH,
        component: PendingOrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {}
