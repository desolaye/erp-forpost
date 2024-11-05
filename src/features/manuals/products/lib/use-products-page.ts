import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getProductsManual } from '@/entities/manuals'
import { useSearch } from '@/shared/lib/use-search'

export const useProductsPage = () => {
  const [productId, setProductId] = useState('')
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [productBarcodeId, setProductBarcodeId] = useState('')

  const { getTotalCount, page, params, setPage } = usePagination(9)
  const { filters, search, setSearch, debouncedSearch } = useSearch('name')

  const { data: products, isPending } = useQuery({
    queryFn: () =>
      getProductsManual({
        params,
        filters,
      }),
    queryKey: ['products_all', page, debouncedSearch],
  })

  const openModal = (id?: string) => setProductId(id || '')

  return {
    values: {
      products: products?.data.products,
      totalCount: getTotalCount(products?.data.totalCount),
      page,
      productId,
      isPending,
      search,
      productBarcodeId,
      categoriesOpen,
    },
    handlers: {
      openModal,
      setCategoriesOpen,
      setPage,
      setSearch,
      setProductBarcodeId,
    },
  }
}
