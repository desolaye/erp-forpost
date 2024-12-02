import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getWarehousesManual, WarehouseType } from '@/entities/manuals'

export const useWarehousesPage = () => {
  const [id, setId] = useState('')
  const [warehouse, setWarehouse] = useState<WarehouseType>()

  const { data: warehouses, isFetching } = useQuery({
    queryFn: () => getWarehousesManual(),
    queryKey: ['warehouses_all'],
    refetchOnWindowFocus: false,
  })

  const openModal = (edit?: WarehouseType) => {
    setId(edit?.storageId || '')
    setWarehouse(edit)
  }

  return {
    values: {
      data: warehouses?.data,
      id,
      totalCount: 0,
      isPending: isFetching,
      warehouse,
    },
    handlers: {
      openModal,
      setId,
    },
  }
}
