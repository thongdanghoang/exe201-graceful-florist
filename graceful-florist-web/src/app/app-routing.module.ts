import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {AppRoutingConstants} from './app-routing-constants';
import {OrderTrackingComponent} from './order-tracking/order-tracking.component';
import {orderDetailResolver} from './order-detail/order-detail.resolver';
import {OrderDetailComponent} from './order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/dev/dev.module').then(m => m.DevModule)
  },
  {
    path: AppRoutingConstants.HOME_PATH,
    component: HomepageComponent
  },
  {
    path: AppRoutingConstants.ORDER_TRACKING_PATH,
    component: OrderTrackingComponent
  },
  {
    path: AppRoutingConstants.ORDERS,
    component: OrderDetailComponent,
    resolve: {
      order: orderDetailResolver
    }
  },
  {
    path: AppRoutingConstants.FORBIDDEN,
    component: HomepageComponent
  },
  {
    path: AppRoutingConstants.DEV_PATH,
    loadChildren: () =>
      import('./modules/dev/dev.module').then(m => m.DevModule)
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/dev/dev.module').then(m => m.DevModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
