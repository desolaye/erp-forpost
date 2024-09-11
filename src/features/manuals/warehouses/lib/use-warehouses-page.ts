import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getWarehousesManual } from '@/entities/manuals'

export const useWarehousesPage = () => {
  const [id, setId] = useState('')

  const { data: warehouses, isPending } = useQuery({
    queryFn: getWarehousesManual,
    queryKey: ['warehouses_all'],
  })

  const handleOpenModal = (editId: string) => {
    setId(editId)
  }

  return {
    values: {
      data: warehouses?.data,
      id,
      isPending,
    },
    handlers: {
      handleOpenModal,
    },
  }
}
