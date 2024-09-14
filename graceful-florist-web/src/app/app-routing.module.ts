import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {AppRoutingConstants} from './app-routing-constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutingConstants.HOME_PATH
  },
  {
    path: AppRoutingConstants.HOME_PATH,
    component: HomepageComponent
  },
  {
    // TODO: Add a 403 page instead homepage
    path: AppRoutingConstants.FORBIDDEN_PATH,
    component: HomepageComponent
  },
  {
    path: AppRoutingConstants.DEV_PATH,
    loadChildren: () =>
      import('./modules/dev/dev.module').then(m => m.DevModule)
  },
  {
    path: AppRoutingConstants.ORDERS_PATH,
    loadChildren: () =>
      import('./modules/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: AppRoutingConstants.AUTH_PATH,
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    // TODO: Add a 404 page instead homepage
    path: '**',
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
