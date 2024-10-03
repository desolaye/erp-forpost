import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

import { usePagination } from '@/shared/lib/use-pagination'
import { getProductsByWarehouse } from '@/entities/manuals'
import { useSearch } from '@/shared/lib/use-search'

export const useWarehouseProductsPage = () => {
  const { uuid } = useParams({ strict: false }) as { uuid: string }

  const { getTotalCount, page, params, setPage } = usePagination(11)
  const { filters, search, setSearch, debouncedSearch } = useSearch('productName')

  const { data: products, isPending } = useQuery({
    queryFn: () =>
      getProductsByWarehouse(uuid, {
        params,
        filters,
      }),
    queryKey: ['warehouse_products_all', page, debouncedSearch],
  })

  return {
    values: {
      products: products?.data.products || [],
      totalCount: getTotalCount(products?.data.totalCount),
      page,
      isPending,
      search,
    },
    handlers: {
      setPage,
      setSearch,
    },
  }
}
