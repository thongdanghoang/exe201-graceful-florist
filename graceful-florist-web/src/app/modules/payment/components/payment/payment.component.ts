import {Component, OnInit, inject} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'graceful-florist-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  protected selectedProductIds: string[] = [];
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const ids = params.get('ids');
      if (ids) {
        // eslint-disable-next-line no-console
        console.debug('Selected product ids:', ids);
        this.selectedProductIds = ids.split(',');
      }
    });
  }
}
