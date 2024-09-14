import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ApplicationService} from './services/application.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  providers: [ApplicationService]
})
export class AuthModule {}
