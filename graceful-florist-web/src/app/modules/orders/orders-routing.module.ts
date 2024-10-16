import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';
import {orderDetailResolver} from './services/order-detail.resolver';

const routes: Routes = [
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
