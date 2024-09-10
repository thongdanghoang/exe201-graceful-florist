import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {AppRoutingConstants} from './app-routing-constants';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: AppRoutingConstants.HOME_PATH,
    component: HomepageComponent
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
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
