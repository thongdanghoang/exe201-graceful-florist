export class AppRoutingConstants {
  public static readonly BASE_URL = '';
  public static readonly BACKEND_API_URL = `${AppRoutingConstants.BASE_URL}/api`;

  // app module
  public static readonly HOME_PATH = 'homepage';
  public static readonly FORBIDDEN_PATH = 'forbidden';

  // Products module
  public static readonly PRODUCTS_PATH = 'products';
  public static readonly CUSTOMIZE_FLOWER_PATH = 'customization';

  // Cart module
  public static readonly CART_PATH = 'carts';

  // Payment module
  public static readonly PAYMENT_PATH = 'payments';

  // orders module
  public static readonly ORDERS_PATH = 'orders';

  // auth module
  public static readonly AUTH_PATH = 'auth';

  // dev module
  public static readonly DEV_PATH = 'dev';

  // admin module
  public static readonly ADMIN_PATH = 'admin';
  public static readonly DASHBOARD_PATH = 'dashboard';
  public static readonly PRODUCTS_MANAGEMENT_PATH = 'products';
  public static readonly ORDERS_MANAGEMENT_PATH = 'orders';
  public static readonly CLASSIFICATIONS_PATH = 'categories';
  public static readonly SETTINGS_PATH = 'settings';
  public static readonly LOGOUT = 'logout';
}
