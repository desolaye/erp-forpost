import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { useSearch } from '@/shared/lib/use-search'
import { useFileLoader } from '@/shared/lib/use-file-loader'

import {
  deleteWarehouseById,
  getStaffManual,
  postCreateWarehouse,
  putEditWarehouse,
  WarehouseType,
  WarehouseValidatorType,
} from '@/entities/manuals'

interface IWarehouseEditorProps {
  warehouse?: WarehouseType
  onClose?: () => void
}

export const useWarehouseEditor = (props: IWarehouseEditorProps) => {
  const { warehouse, onClose } = props
  const [tab, setTab] = useState('data')

  const queryClient = useQueryClient()

  const { files, isPendingFile, mutateFile } = useFileLoader(
    warehouse?.id || '',
    'files_all',
  )

  const { filters, search, setSearch, debouncedSearch } = useSearch('lastName')

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['warehouse_by_id', warehouse?.id] })
    queryClient.invalidateQueries({ queryKey: ['warehouses_all'] })
    if (onClose) onClose()
  }

  const createWarehouse = useMutation({
    mutationFn: postCreateWarehouse,
    onSuccess,
  })

  const editWarehouse = useMutation({
    mutationFn: putEditWarehouse,
    onSuccess,
  })

  const deleteWarehouse = useMutation({
    mutationFn: deleteWarehouseById,
    onSuccess,
  })

  const { data: staff, isLoading: isLoadingStaff } = useQuery({
    queryFn: () => getStaffManual({ params: { limit: 8, skip: 0 }, filters }),
    queryKey: ['staff_all', debouncedSearch],
  })

  const handleMutate = (data: WarehouseValidatorType) => {
    console.log(data)

    if (warehouse?.id) return editWarehouse.mutateAsync(data)
    return createWarehouse.mutateAsync(data)
  }

  return {
    values: {
      tab,
      isError:
        createWarehouse.isError || editWarehouse.isError || deleteWarehouse.isError,
      isPendingMutate:
        createWarehouse.isPending || editWarehouse.isPending || deleteWarehouse.isPending,
      isLoading: isLoadingStaff,
      staff: staff?.data.employees,
      search,
      files,
      isPendingFile,
    },
    handlers: {
      onMutate: handleMutate,
      onDelete: () => deleteWarehouse.mutateAsync(warehouse?.id || ''),
      setSearch,
      setTab,
      mutateFile,
    },
  }
}
