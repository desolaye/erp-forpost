import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getWarehousesManual } from '@/entities/manuals'

export const useWarehousesPage = () => {
  const [id, setId] = useState('')
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 11

  const { data: warehouses, isPending } = useQuery({
    queryFn: () =>
      getWarehousesManual({
        params: { limit: ITEMS_PER_PAGE, skip: (page - 1) * ITEMS_PER_PAGE },
      }),
    queryKey: ['warehouses_all', page],
  })

  const handleOpenModal = (editId: string) => {
    setId(editId)
  }

  return {
    values: {
      data: warehouses?.data.storages.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE,
      ),
      id,
      totalCount: Math.ceil((warehouses?.data.totalCount || 0) / ITEMS_PER_PAGE),
      page,
      isPending,
    },
    handlers: {
      setPage,
      handleOpenModal,
    },
  }
}
