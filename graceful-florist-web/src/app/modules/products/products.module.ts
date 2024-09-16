import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductService} from './services/product.service';

@NgModule({
  declarations: [ProductDetailComponent, ProductsComponent],
  imports: [SharedModule, CommonModule, ProductsRoutingModule],
  providers: [ProductService]
})
export class ProductsModule {}
