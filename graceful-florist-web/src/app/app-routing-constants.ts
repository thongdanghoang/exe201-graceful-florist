export class AppRoutingConstants {
  public static readonly BASE_URL = '';
  public static readonly BACKEND_API_URL = `${AppRoutingConstants.BASE_URL}/api`;

  // app module
  public static readonly HOME_PATH = 'homepage';
  public static readonly FORBIDDEN_PATH = 'forbidden';

  // Products module
  public static readonly PRODUCTS_PATH = 'products';
  public static readonly CUSTOMIZE_FLOWER_PATH = 'customization';
  public static readonly CART_PATH = 'cart';

  // orders module
  public static readonly ORDERS_PATH = 'orders';
  public static readonly ORDER_TRACKING_PATH = 'order-tracking';

  // auth module
  public static readonly AUTH_PATH = 'auth';

  // dev module
  public static readonly DEV_PATH = 'dev';
}
