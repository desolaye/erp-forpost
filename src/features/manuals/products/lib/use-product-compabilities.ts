import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  deleteProductCompabilitiesById,
  getProductCompabilitiesById,
  postAddProductCompabilities,
} from '@/entities/manuals/services/product-compabitities'
import { getProductsManual } from '@/entities/manuals'

type HookProps = {
  productId: string
}

const baseOption = {
  label: 'Выберите продукт...',
  value: '',
}

export const useProductCompabilities = (props: HookProps) => {
  const { productId } = props

  const queryClient = useQueryClient()

  const [isAddingCompability, setIsAddingCompability] = useState(false)
  const [currentCompability, setCurrentCompability] = useState(baseOption)

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['product_compabilities', productId] })

    setIsAddingCompability(false)
    setCurrentCompability(baseOption)
  }

  const { data: products, isFetching: isFetchingProducts } = useQuery({
    queryFn: () => getProductsManual({ skip: 0, limit: 1000 }),
    queryKey: ['products_all'],
    refetchOnWindowFocus: false,
  })

  const { data: compabilities, isFetching: isFetchingCompabilities } = useQuery({
    queryFn: () => getProductCompabilitiesById(productId),
    queryKey: ['product_compabilities', productId],
    refetchOnWindowFocus: false,
  })

  const mutateAddCompability = useMutation({
    mutationFn: (parentProductId: string) =>
      postAddProductCompabilities({ productId, parentProductId }),
    onSuccess,
  })

  const mutateDeleteCompability = useMutation({
    mutationFn: deleteProductCompabilitiesById,
    onSuccess,
  })

  return {
    values: {
      isAddingCompability,
      currentCompability,
      products: products?.data.items,
      compabilities,
      isLoading:
        isFetchingProducts ||
        isFetchingCompabilities ||
        mutateAddCompability.isPending ||
        mutateDeleteCompability.isPending,
    },
    handlers: {
      onAddCompability: mutateAddCompability.mutateAsync,
      onDeleteCompability: mutateDeleteCompability.mutateAsync,
      setIsAddingCompability,
      setCurrentCompability,
    },
  }
}
