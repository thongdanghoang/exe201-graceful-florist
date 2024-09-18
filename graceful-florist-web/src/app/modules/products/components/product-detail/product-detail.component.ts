import {Component, OnInit} from '@angular/core';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {ProductDetailDto, ProductDto} from '../../models/product.dto';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'graceful-florist-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  protected productDto: ProductDetailDto;
  protected recommendedProducts: ProductDto[];
  protected mainImage: string;
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Sản Phẩm', path: AppRoutingConstants.PRODUCTS_PATH},
    {label: 'Hoa cho cặp đôi'}
  ];
  protected currentSlide = 0;

  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    super();
    this.productDto = {} as ProductDetailDto;
    this.recommendedProducts = [];
    this.mainImage = '';
  }

  ngOnInit(): void {
    this.registerSubscriptions([
      this.productService
        .getProductById(this.route.snapshot.paramMap.get('id') as string)
        .subscribe((productDto: ProductDetailDto): void => {
          this.productDto = productDto;
          this.mainImage = productDto.image_url;
        }),
      this.productService
        .getRecommendedProducts()
        .subscribe((recommendedProducts: ProductDto[]): void => {
          this.recommendedProducts = recommendedProducts;
        })
    ]);
  }

  protected addToCart(): void {}

  protected buyNow(): void {}

  protected onProductClick(product: ProductDto): void {
    void this.router.navigate([
      `${AppRoutingConstants.PRODUCTS_PATH}/${product.id}`
    ]);
  }

  protected changeMainImage(imageUrl: string): void {
    this.mainImage = imageUrl;
  }
}
