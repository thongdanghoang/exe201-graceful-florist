import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {PaymentRoutingModule} from './payment-routing.module';
import {PaymentComponent} from './components/payment/payment.component';

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, SharedModule, PaymentRoutingModule]
})
export class PaymentModule {}
