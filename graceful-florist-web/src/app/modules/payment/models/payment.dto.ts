import {CartItemDTO} from '../../cart/models/cart.dto';

export enum PaymentMethod {
  COD = 'COD',
  VNPAY = 'VNPAY',
  MOMO = 'MOMO'
}

export interface PaymentDto {
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
    deliveryDate: string;
    deliveryTime: string;
  };
  message: string;
  paymentMethod: PaymentMethod;
  products: CartItemDTO[];
}
