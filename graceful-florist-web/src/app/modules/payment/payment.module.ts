import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {PaymentRoutingModule} from './payment-routing.module';
import {PaymentComponent} from './components/payment/payment.component';
import {ProductService} from '../products/services/product.service';

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, SharedModule, PaymentRoutingModule],
  providers: [ProductService]
})
export class PaymentModule {}
