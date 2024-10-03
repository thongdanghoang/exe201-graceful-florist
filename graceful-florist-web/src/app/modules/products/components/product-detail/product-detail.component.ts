import {Component, OnInit, inject} from '@angular/core';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {
  CommentDto,
  CommentSearchCriteriaDto,
  ProductDetailDto,
  ProductDto
} from '../../models/product.dto';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../../shared/models/abstract-base-dto';
import {PageEvent} from '@angular/material/paginator';
import {CartService} from '../../../cart/services/cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'graceful-florist-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  protected productDto: ProductDetailDto | undefined;
  protected commentCriteria: SearchCriteriaDto<CommentSearchCriteriaDto>;
  protected mainImage: string | undefined;
  protected recommendedProducts: ProductDto[] = [];
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Sản Phẩm', path: AppRoutingConstants.PRODUCTS_PATH},
    {label: 'Hoa cho cặp đôi'}
  ];
  private readonly cartService: CartService = inject(CartService);
  private readonly productService: ProductService = inject(ProductService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);

  constructor() {
    super();
    this.commentCriteria = {
      page: {
        limit: 5,
        offset: 0
      },
      sort: {
        column: 'name',
        direction: 'asc'
      },
      criteria: {
        productId: this.route.snapshot.paramMap.get('id') as string
      } as CommentSearchCriteriaDto
    };
  }

  ngOnInit(): void {
    this.registerSubscriptions([
      this.route.paramMap.subscribe(params => {
        this.productService
          .getProductById(params.get('id') as string)
          .subscribe((productDto: ProductDetailDto): void => {
            this.productDto = productDto;
            this.mainImage = productDto.imageUrl;
          });
      }),
      this.productService
        .getProductComment(this.commentCriteria)
        .subscribe((comments: SearchResultDto<CommentDto>): void => {
          if (this.productDto) this.productDto.comments = comments;
        }),
      this.productService
        .getRecommendedProducts()
        .subscribe((recommendedProducts: ProductDto[]): void => {
          this.recommendedProducts = recommendedProducts;
        })
    ]);
  }

  protected addToCart(): void {
    this.cartService.addToCart([
      {
        ...(this.productDto as ProductDto),
        quantity: 1
      }
    ]);
    const snackBarRef = this._snackBar.open(
      'Đã thêm vào giỏ hàng',
      'Đi đến giỏ hàng'
    );
    this.registerSubscription(
      snackBarRef.onAction().subscribe((): void => {
        void this.router.navigate([`${AppRoutingConstants.CART_PATH}`]);
      })
    );
  }

  protected buyNow(): void {}

  protected onProductClick(product: ProductDto): void {
    void this.router.navigate([`products/${product.id}`]);
  }

  protected changeMainImage(imageUrl: string): void {
    this.mainImage = imageUrl;
  }

  protected onCommentPageChange(pageEvent: PageEvent): void {
    this.commentCriteria.page.limit = pageEvent.pageSize;
    this.commentCriteria.page.offset =
      pageEvent.pageIndex * this.commentCriteria.page.limit;
    this.registerSubscription(
      this.productService
        .getProductComment(this.commentCriteria)
        .subscribe((comments: SearchResultDto<CommentDto>): void => {
          if (this.productDto) this.productDto.comments = comments;
        })
    );
  }
}
