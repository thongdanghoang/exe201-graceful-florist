import {CartItemDTO} from '../../cart/models/cart.dto';
import {AbstractBaseDto} from '../../shared/models/abstract-base-dto';

export enum PaymentMethod {
  COD = 'COD',
  VNPAY = 'VNPAY'
}

export interface PaymentDto extends AbstractBaseDto {
  recipient: {
    fullName: string;
    phone: string;
    district: string;
    ward: string;
    addressDetail: string;
  };
  sender: {
    fullName: string;
    phone: string;
  };
  deliveryDateTime: {
    deliveryDate: Date;
    deliveryTimeFrom: Date;
    deliveryTimeTo: Date;
  };
  message: string;
  paymentMethod: PaymentMethod;
  products: CartItemDTO[];
}
