export const routesPath = {
  landing: () => '/',
  login: () => '/login',
  registration: () => '/registration',
  erp: {
    root: () => '/home',
    products: () => '/products',
  },
} as const
