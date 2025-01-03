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
      productCompleted: (pre = '') => `${pre}/product-completed`,
      orders: (pre = '') => `${pre}/orders`,
    },
    crm: {
      root: () => '/crm',
      invoices: (pre = '') => `${pre}/invoices`,
      issuesHistory: (pre = '') => `${pre}/issues-history`,
      priceLists: (pre = '') => `${pre}/price-lists`,
    },
    warehouses: {
      root: () => '/warehouses',
      all: (pre = '') => `${pre}/all`,
      history: (pre = '') => `${pre}/history`,
      products: (pre = '', post = '$uuid') => `${pre}/${post}`,
    },
  },
} as const
