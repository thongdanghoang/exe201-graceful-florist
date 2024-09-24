import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TotalCardComponent} from './components/total-card/total-card.component';

@NgModule({
  declarations: [DashboardComponent, TotalCardComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule]
})
export class AdminModule {}
