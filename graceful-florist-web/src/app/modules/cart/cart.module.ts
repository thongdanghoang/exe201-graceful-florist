import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartsRoutingModule} from './carts-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CartService} from './services/cart.service';
import {CartComponent} from './components/cart/cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CartsRoutingModule, SharedModule],
  providers: [CartService]
})
export class CartModule {}
