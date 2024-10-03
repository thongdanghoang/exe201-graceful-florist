import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {PaymentRoutingModule} from './payment-routing.module';
import {PaymentComponent} from './components/payment/payment.component';
import {ProductService} from '../products/services/product.service';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';

@NgModule({
  declarations: [PaymentComponent, PaymentModalComponent],
  imports: [CommonModule, SharedModule, PaymentRoutingModule],
  providers: [ProductService]
})
export class PaymentModule {}
