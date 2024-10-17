import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

import { usePagination } from '@/shared/lib/use-pagination'
import { getProductsByWarehouse } from '@/entities/manuals'
import { useSearch } from '@/shared/lib/use-search'
import { useState } from 'react'

export const useWarehouseProductsPage = () => {
  const { uuid } = useParams({ strict: false }) as { uuid: string }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScanOpen, setIsScanOpen] = useState(false)

  const queryClient = useQueryClient()

  const { getTotalCount, page, params, setPage } = usePagination(11)
  const { filters, search, setSearch, debouncedSearch } = useSearch('productName')

  const { data: products, isPending } = useQuery({
    queryFn: () =>
      getProductsByWarehouse(uuid, {
        params,
        filters,
      }),
    queryKey: ['warehouse_products_all', page, debouncedSearch],
  })

  const endScan = () => {
    queryClient.invalidateQueries({ queryKey: ['warehouse_products_all'] })
    setIsScanOpen(false)
  }

  return {
    values: {
      products: products?.data.products || [],
      totalCount: getTotalCount(products?.data.totalCount),
      page,
      isPending,
      search,
      isModalOpen,
      isScanOpen,
      uuid,
    },
    handlers: {
      setPage,
      setSearch,
      setIsModalOpen,
      setIsScanOpen,
      endScan,
    },
  }
}
