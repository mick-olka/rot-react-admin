export enum ROUTES {
  home = '/',
  error = '/*',

  // Info
  info = '/info',

  product = '/product/:id',
  createProduct = '/product/create',

  collectionsPage = '/collections',
  collection = '/collections/:id',

  // Auth
  login = '/login',
  register = '/register',
}
