import { useQuery } from '@tanstack/react-query'

import { useSearch } from '@/shared/lib/use-search'

import {
  getOperationsAll,
  getProductsManual,
  operationsToOptions,
  productsToOptions,
} from '@/entities/manuals'
import { PriceListType } from '@/entities/crm/price-list'

interface IUsePriceListDetailed {
  priceList?: PriceListType
}

export const usePriceListDetailed = (props: IUsePriceListDetailed) => {
  const { priceList } = props

  const { filters, search, setSearch, debouncedSearch } = useSearch('name')

  const { data: operations } = useQuery({
    queryFn: getOperationsAll,
    queryKey: ['operation_all'],
  })

  const { data: products } = useQuery({
    queryFn: () => getProductsManual({ params: { limit: 8, skip: 0 }, filters }),
    queryKey: ['product_all', debouncedSearch],
  })

  const productOptions = productsToOptions(products?.data.products)
  const operationOptions = operationsToOptions(operations?.data)

  return {
    values: {
      productOptions,
      operationOptions,
      search,
      defaultPriceList: priceList,
    },
    handlers: {
      setSearch,
    },
  }
}
