import { useQuery } from '@tanstack/react-query'

import { useSearch } from '@/shared/lib/use-search'

import { getProductsManual, productsToOptions } from '@/entities/manuals'
import { PriceListType } from '@/entities/crm/price-list'
import { getOperationsAll } from '@/entities/manuals/operations'

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
    queryFn: () => getProductsManual({ limit: 8, skip: 0, name: filters?.filterValues }),
    queryKey: ['product_all', debouncedSearch],
  })

  const productOptions = productsToOptions(products?.data.items)
  const operationOptions = operations?.map((v) => ({ label: v.name, value: v.id })) || []

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
