import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'

import { getWarehousesManual } from '@/entities/manuals'

export const useWarehousesPage = () => {
  const [id, setId] = useState('')
  const { page, params, setPage } = usePagination(11)
  const { filters, search, setSearch, debouncedSearch } = useSearch('name')

  const { data: warehouses, isPending } = useQuery({
    queryFn: () =>
      getWarehousesManual({
        params,
        filters,
      }),
    queryKey: ['warehouses_all', debouncedSearch],
  })

  const handleOpenModal = (editId?: string) => {
    setId(editId || '')
  }

  return {
    values: {
      data: warehouses?.data.storages,
      id,
      totalCount: 0,
      page,
      isPending,
      search,
    },
    handlers: {
      setPage,
      handleOpenModal,
      setSearch,
    },
  }
}
