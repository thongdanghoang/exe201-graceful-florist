import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderTrackingComponent} from './components/order-tracking/order-tracking.component';
import {AppRoutingConstants} from '../../app-routing-constants';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';
import {orderDetailResolver} from './services/order-detail.resolver';

const routes: Routes = [
  {
    path: AppRoutingConstants.ORDER_TRACKING_PATH,
    component: OrderTrackingComponent
  },
  {
    path: ':id',
    component: OrderDetailComponent,
    resolve: {
      order: orderDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
