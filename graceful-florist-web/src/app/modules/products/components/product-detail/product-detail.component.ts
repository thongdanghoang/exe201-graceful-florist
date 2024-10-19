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
import {uuid} from '../../../../../../graceful-florist-type';

@Component({
  selector: 'graceful-florist-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  protected isProductLoading: boolean = true;
  protected isCommentsLoading: boolean = true;
  protected productDto: ProductDetailDto | undefined;
  protected commentCriteria: SearchCriteriaDto<CommentSearchCriteriaDto>;
  protected mainImage: uuid | undefined;
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
        pageSize: 5,
        pageNumber: 0
      },
      sort: {
        column: 'createdDate',
        direction: 'desc'
      },
      criteria: {
        productId: this.route.snapshot.paramMap.get('id') as string
      } as CommentSearchCriteriaDto
    };
  }

  ngOnInit(): void {
    this.registerSubscriptions([
      this.route.paramMap.subscribe(params => {
        this.registerSubscription(
          this.productService
            .getProductById(params.get('id') as string)
            .subscribe((productDto: ProductDetailDto): void => {
              this.productDto = productDto;
              this.mainImage = productDto.mainImage;
              this.isProductLoading = false;
              this.registerSubscription(
                this.productService
                  .getProductComment(this.commentCriteria)
                  .subscribe((comments: SearchResultDto<CommentDto>): void => {
                    if (this.productDto) {
                      this.productDto.comments = comments;
                      this.isCommentsLoading = false;
                    }
                  })
              );
            })
        );
      }),
      this.productService
        .getRecommendedProducts(this.productDto?.id)
        .subscribe((recommendedProducts: ProductDto[]): void => {
          this.recommendedProducts = recommendedProducts;
        })
    ]);
  }

  protected addToCart(): void {
    const item = this.cartService.cartItemsChanged.value.filter(
      item => item.product.id === this.productDto?.id
    )[0];
    if (item) {
      item.quantity += 1;
    }
    this.registerSubscription(
      this.cartService
        .saveOrUpdate(
          item ?? {
            product: this.productDto as ProductDto,
            quantity: 1
          }
        )
        .subscribe((): void => {
          const snackBarRef = this._snackBar.open(
            'Đã thêm vào giỏ hàng',
            'Đi đến giỏ hàng'
          );
          this.registerSubscription(
            snackBarRef.onAction().subscribe((): void => {
              void this.router.navigate([`${AppRoutingConstants.CART_PATH}`]);
            })
          );
        })
    );
  }

  protected buyNow(): void {
    this.registerSubscription(
      this.cartService
        .saveOrUpdate({
          product: this.productDto as ProductDetailDto,
          quantity: 1
        })
        .subscribe((): void => {
          const queryParams = {products: [this.productDto?.id]};
          void this.router
            .navigate([AppRoutingConstants.PAYMENT_PATH], {queryParams})
            .then();
        })
    );
  }

  protected onProductClick(product: ProductDto): void {
    this.registerSubscription(
      this.productService
        .getRecommendedProducts(product.id)
        .subscribe((recommendedProducts: ProductDto[]): void => {
          this.recommendedProducts = recommendedProducts;
        })
    );
    void this.router.navigate([`products/${product.id}`]);
  }

  protected changeMainImage(imageUrl: uuid): void {
    this.mainImage = imageUrl;
  }

  protected onCommentPageChange(pageEvent: PageEvent): void {
    this.commentCriteria.page.pageSize = pageEvent.pageSize;
    this.commentCriteria.page.pageNumber = pageEvent.pageIndex;
    this.registerSubscription(
      this.productService
        .getProductComment(this.commentCriteria)
        .subscribe((comments: SearchResultDto<CommentDto>): void => {
          if (this.productDto) this.productDto.comments = comments;
        })
    );
  }
}
