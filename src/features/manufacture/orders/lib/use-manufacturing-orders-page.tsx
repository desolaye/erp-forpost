import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'

import { getManufacturingOrders } from '@/entities/manufacture'

export const useManufacturingOrdersPage = () => {
  const { getTotalCount, page, params, setPage } = usePagination(50)
  const { filters, search, setSearch, debouncedSearch } = useSearch('number')

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [priority, setPriority] = useState<number>()
  const [orderStatus, setOrderStatus] = useState<number>()
  const [selectedOrderId, setSelectedOrderId] = useState<string>()

  const { data, isFetching } = useQuery({
    queryFn: () =>
      getManufacturingOrders({
        ...params,
        number: filters?.filterValues,
        manufacturingOrderStatus: orderStatus,
        priorityStatus: priority,
      }),
    queryKey: ['orders_all', page, debouncedSearch, priority, orderStatus],
    refetchOnWindowFocus: false,
  })

  return {
    values: {
      orders: data?.items,
      totalCount: getTotalCount(data?.totalCount),
      page,
      selectedOrderId,
      isPending: isFetching,
      orderStatus,
      priority,
      isFiltersOpen,
      search,
    },
    handlers: {
      setPage,
      setSelectedOrderId,
      setIsFiltersOpen,
      setSearch,
      setPriority,
      setOrderStatus,
    },
  }
}
