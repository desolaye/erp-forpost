import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useSearch } from '@/shared/lib/use-search'

import {
  getProductsManual,
  ProductByWarehouseValidatorType,
  ZProductByWarehouseToBack,
  postCreateProductByWarehouse,
} from '@/entities/manuals'

interface IUseWarehouseProductsCreator {
  warehouseId: string
  onClose?: () => void
}

export const useWarehouseProductsCreator = (props: IUseWarehouseProductsCreator) => {
  const { warehouseId, onClose } = props

  const { debouncedSearch, filters, search, setSearch } = useSearch('name')
  const queryClient = useQueryClient()

  const { data: products } = useQuery({
    queryFn: () => getProductsManual({ params: { limit: 8, skip: 0 }, filters: filters }),
    queryKey: ['products_all', debouncedSearch],
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: ProductByWarehouseValidatorType) =>
      postCreateProductByWarehouse(warehouseId, ZProductByWarehouseToBack.parse(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products_all'] })
      queryClient.invalidateQueries({ queryKey: ['warehouse_products_all'] })
      if (onClose) onClose()
    },
    onError: () => {
      console.log('error')
    },
  })

  return {
    values: {
      products: products?.data.products,
      search,
    },
    handlers: {
      mutateAsync,
      setSearch,
    },
  }
}
