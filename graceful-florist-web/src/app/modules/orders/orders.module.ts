import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderTrackingComponent} from './components/order-tracking/order-tracking.component';
import {OrdersRoutingModule} from './orders-routing.module';
import {SharedModule} from '../shared/shared.module';
import {OrdersService} from './services/orders.service';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';
import {RatingComponent} from './components/rating/rating.component';

@NgModule({
  declarations: [OrderTrackingComponent, OrderDetailComponent, RatingComponent],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
  providers: [OrdersService]
})
export class OrdersModule {}
