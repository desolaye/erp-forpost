import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  deleteProductCompabilitiesById,
  getProductCompabilitiesById,
  postAddProductCompabilities,
} from '@/entities/manuals/services/product-compabitities'
import { getProductsManual } from '@/entities/manuals'
import { useSearch } from '@/shared/lib/use-search'

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
  const productSearch = useSearch('name')

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['product_compabilities', productId] })

    setIsAddingCompability(false)
    setCurrentCompability(baseOption)
  }

  const { data: products } = useQuery({
    queryFn: () =>
      getProductsManual({
        skip: 0,
        limit: 50,
        name: productSearch.filters?.filterValues,
      }),
    queryKey: ['products_all', productSearch.debouncedSearch],
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
        isFetchingCompabilities ||
        mutateAddCompability.isPending ||
        mutateDeleteCompability.isPending,
    },
    handlers: {
      onAddCompability: mutateAddCompability.mutateAsync,
      onDeleteCompability: mutateDeleteCompability.mutateAsync,
      onProductSearh: productSearch.setSearch,
      setIsAddingCompability,
      setCurrentCompability,
    },
  }
}
