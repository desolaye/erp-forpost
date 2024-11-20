import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'

import { getProductsManual } from '@/entities/manuals'
import { guidEmpty } from '@/entities/categories'

export const useProductsPage = () => {
  const [productId, setProductId] = useState('')
  const [productBarcodeId, setProductBarcodeId] = useState('')
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const [currentCategory, setCurrentCategory] = useState(guidEmpty)

  const { getTotalCount, page, params, setPage } = usePagination(50)
  const { filters, search, setSearch, debouncedSearch } = useSearch('name')

  const { data: products, isFetching } = useQuery({
    queryFn: () =>
      getProductsManual({
        ...params,
        name: filters?.filterValues,
        categoryId: currentCategory === guidEmpty ? undefined : currentCategory,
      }),
    queryKey: ['products_all', page, debouncedSearch, currentCategory],
    refetchOnWindowFocus: false,
  })

  const openModal = (id?: string) => setProductId(id || '')

  return {
    values: {
      products: products?.data.items,
      totalCount: getTotalCount(products?.data.totalCount),
      page,
      productId,
      isLoading: isFetching,
      search,
      productBarcodeId,
      categoriesOpen,
      currentCategory,
    },
    handlers: {
      openModal,
      setCategoriesOpen,
      setCurrentCategory,
      setPage,
      setSearch,
      setProductBarcodeId,
    },
  }
}
