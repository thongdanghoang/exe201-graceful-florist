export class AppRoutingConstants {
  public static readonly BASE_URL = 'http://localhost:8080';
  public static readonly BACKEND_API_URL = `${AppRoutingConstants.BASE_URL}`;

  // app module
  public static readonly HOME_PATH = 'homepage';
  public static readonly FORBIDDEN_PATH = 'forbidden';

  // Products module
  public static readonly PRODUCTS_PATH = 'products';
  public static readonly INGREDIENTS_PATH = `${AppRoutingConstants.PRODUCTS_PATH}/ingredients`;
  public static readonly CATEGORY_PATH = `${AppRoutingConstants.PRODUCTS_PATH}/categories`;
  public static readonly CUSTOMIZE_FLOWER_PATH = 'customization';

  // Cart module
  public static readonly CART_PATH = 'carts';

  // Payment module
  public static readonly PAYMENT_PATH = 'payments';

  // orders module
  public static readonly ORDERS_PATH = 'orders';

  // auth module
  public static readonly AUTH_PATH = 'auth';
  public static readonly LOGIN_PATH = 'sign-in';
  public static readonly REGISTER_PATH = 'sign-up';

  // images resource
  public static readonly IMAGES_PATH = 'images';

  // dev module
  public static readonly DEV_PATH = 'dev';

  // admin module
  public static readonly ADMIN_PATH = 'admin';
  public static readonly DASHBOARD_PATH = 'dashboard';
  public static readonly PRODUCTS_MANAGEMENT_PATH = 'products';
  public static readonly ORDERS_MANAGEMENT_PATH = 'orders';
  public static readonly CLASSIFICATIONS_PATH = 'categories';
  public static readonly USERS_MANAGEMENT = 'users';
  public static readonly LOGOUT = 'logout';
}
