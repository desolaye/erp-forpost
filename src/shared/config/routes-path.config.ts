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
    manufacture: {
      root: () => '/manufacture',
      processes: (pre = '') => `${pre}/processes`,
      issues: (pre = '', post = '$uuid') => `${pre}/processes/${post}`,
      proddev: (pre = '') => `${pre}/product-develop`,
      proddevIssue: (pre = '', post = '$issueId') => `${pre}/product-develop/${post}`,
    },
  },
} as const
