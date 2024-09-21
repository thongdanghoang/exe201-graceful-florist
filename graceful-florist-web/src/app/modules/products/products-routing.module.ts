import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ProductsComponent} from './components/products/products.component';
import {AppRoutingConstants} from '../../app-routing-constants';
import {FlowerCustomizationComponent} from './components/flower-customization/flower-customization.component';
import {CartComponent} from '../cart/components/cart/cart.component';

const routes: Routes = [
  {
    path: AppRoutingConstants.CUSTOMIZE_FLOWER_PATH,
    component: FlowerCustomizationComponent
  },
  {
    path: AppRoutingConstants.CART_PATH,
    component: CartComponent
  },
  {path: '', component: ProductsComponent},
  {path: ':id', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
