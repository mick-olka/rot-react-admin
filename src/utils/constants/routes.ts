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

  // Auth
  login = '/login',
  register = '/register',
}
