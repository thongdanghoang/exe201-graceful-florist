import {Component, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';

@Component({
  selector: 'graceful-florist-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  private readonly router: Router = this.injector.get(Router);
  constructor(private readonly injector: Injector) {}

  protected navigateToProducts(): void {
    void this.router.navigate([`${AppRoutingConstants.PRODUCTS_PATH}`]);
  }
}
