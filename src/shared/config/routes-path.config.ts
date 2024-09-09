export const routesPath = {
  landing: () => '/',
  login: () => '/login',
  registration: () => '/registration',
  erp: {
    root: () => '/home',
    manuals: {
      root: () => '/manuals',
      agents: (pre = '') => `${pre}/agents`,
      techMap: (pre = '') => `${pre}/tech-map`,
      products: (pre = '') => `${pre}/products`,
      warehouses: (pre = '') => `${pre}/warehouses`,
      staff: (pre = '') => `${pre}/staff`,
    },
  },
} as const
