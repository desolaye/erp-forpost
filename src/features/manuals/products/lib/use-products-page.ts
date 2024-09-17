import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getProductsManual } from '@/entities/manuals'

export const useProductsPage = () => {
  const [productId, setProductId] = useState('')
  const { getTotalCount, page, params, setPage } = usePagination(11)

  const { data: products, isPending } = useQuery({
    queryFn: () =>
      getProductsManual({
        params,
      }),
    queryKey: ['products_all', page],
  })

  const openModal = (id?: string) => {
    setProductId(id || '')
  }

  return {
    values: {
      products: products?.data.products,
      totalCount: getTotalCount(products?.data.totalCount),
      page,
      productId,
      isPending,
    },
    handlers: {
      openModal,
      setPage,
    },
  }
}
