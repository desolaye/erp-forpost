import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getWarehousesManual } from '@/entities/manuals'
import { usePagination } from '@/shared/lib/use-pagination'

export const useWarehousesPage = () => {
  const [id, setId] = useState('')
  const { getTotalCount, page, params, setPage } = usePagination(11)

  const { data: warehouses, isPending } = useQuery({
    queryFn: () =>
      getWarehousesManual({
        params,
      }),
    queryKey: ['warehouses_all', page],
  })

  const handleOpenModal = (editId?: string) => {
    setId(editId || '')
  }

  return {
    values: {
      data: warehouses?.data.storages.slice((page - 1) * 11, page * 11),
      id,
      totalCount: getTotalCount(warehouses?.data.totalCount),
      page,
      isPending,
    },
    handlers: {
      setPage,
      handleOpenModal,
    },
  }
}
