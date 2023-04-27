export enum ROUTES {
  home = '/',
  error = '/*',

  // Info
  info = '/info',

  product = '/product/:id',
  createProduct = '/product/create',

  collectionsPage = '/collections',
  collection = '/collections/:id',
  createCollection = '/collections/create',

  ordersPage = '/orders',
  order = '/orders/:id',
  createOrder = '/orders/create',

  textBlocksPage = '/text_blocks',

  // Auth
  login = '/login',
  register = '/register',
}
