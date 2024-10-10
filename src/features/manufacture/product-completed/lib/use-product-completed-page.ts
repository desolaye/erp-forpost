import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'

import { getProductCompleted } from '@/entities/manufacture'

export const useProductCompletedPage = () => {
  const [searchBy, setSearchBy] = useState('name')
  const { getTotalCount, page, params, setPage } = usePagination(8)
  const { filters, search, setSearch, debouncedSearch } = useSearch(searchBy)

  const { data, isPending } = useQuery({
    queryFn: () =>
      getProductCompleted({
        params,
        filters,
      }),
    queryKey: ['product_completed_all', page, debouncedSearch, searchBy],
  })

  return {
    values: {
      products: data?.completedProducts,
      totalCount: getTotalCount(data?.totalCount),
      page,
      isPending,
      search,
      searchBy,
    },
    handlers: {
      setPage,
      setSearch,
      setSearchBy,
    },
  }
}
