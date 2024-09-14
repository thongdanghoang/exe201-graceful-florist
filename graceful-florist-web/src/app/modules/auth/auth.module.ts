import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ApplicationService} from './services/application.service';
import {AuthorizeComponent} from './components/authorize/authorize.component';

@NgModule({
  declarations: [AuthorizeComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  providers: [ApplicationService]
})
export class AuthModule {}
