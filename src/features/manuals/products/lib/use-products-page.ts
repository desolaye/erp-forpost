import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getProductsManual } from '@/entities/manuals'

export const useProductsPage = () => {
  const [productId, setProductId] = useState('')
  const [page, setPage] = useState(1)

  const ITEMS_PER_PAGE = 11

  const { data: products, isPending } = useQuery({
    queryFn: () =>
      getProductsManual({
        params: { limit: ITEMS_PER_PAGE, skip: (page - 1) * ITEMS_PER_PAGE },
      }),
    queryKey: ['products_all', page],
  })

  const handleOpenModal = (id: string) => {
    setProductId(id)
  }

  return {
    values: {
      products: products?.data.products,
      totalCount: Math.ceil((products?.data.totalCount || 0) / ITEMS_PER_PAGE),
      page,
      productId,
      isPending,
    },
    handlers: {
      handleOpenModal,
      setPage,
    },
  }
}
