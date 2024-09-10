import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getProductsManual } from '@/entities/manuals'

export const useProductsPage = () => {
  const [productId, setProductId] = useState('')

  const { data: products, isPending } = useQuery({
    queryFn: getProductsManual,
    queryKey: ['products_all'],
  })

  const handleOpenModal = (id: string) => {
    setProductId(id)
  }

  return {
    values: {
      products: products?.data,
      productId,
      isPending,
    },
    handlers: {
      handleOpenModal,
    },
  }
}
