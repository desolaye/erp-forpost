import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getProductDevelopAll } from '@/entities/manufacture'

export const useProductDevelopPage = () => {
  const { page, setPage, getTotalCount, params } = usePagination(11)

  const { data, isPending } = useQuery({
    queryFn: () => getProductDevelopAll({ params }),
    queryKey: ['product_develop_all'],
  })

  return {
    values: {
      products: data?.developments,
      totalCount: getTotalCount(data?.totalCount),
      page,
      isPending,
    },
    handlers: {
      setPage,
    },
  }
}
