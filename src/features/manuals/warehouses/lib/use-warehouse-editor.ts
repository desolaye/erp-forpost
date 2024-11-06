import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  getStaffManual,
  postCreateWarehouse,
  WarehouseValidatorType,
} from '@/entities/manuals'
import { useSearch } from '@/shared/lib/use-search'
import { useFileLoader } from '@/shared/lib/use-file-loader'

interface IWarehouseEditorProps {
  id: string
  onClose?: () => void
}

export const useWarehouseEditor = (props: IWarehouseEditorProps) => {
  const { id, onClose } = props
  const [tab, setTab] = useState('data')

  const queryClient = useQueryClient()

  const { files, isPendingFile, mutateFile } = useFileLoader(id, 'files_all')

  const { filters, search, setSearch, debouncedSearch } = useSearch('lastName')

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (data: WarehouseValidatorType) => postCreateWarehouse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouse_by_id', id] })
      queryClient.invalidateQueries({ queryKey: ['warehouses_all'] })
      if (onClose) onClose()
    },
  })

  const { data: staff, isLoading: isLoadingStaff } = useQuery({
    queryFn: () => getStaffManual({ params: { limit: 8, skip: 0 }, filters }),
    queryKey: ['staff_all', debouncedSearch],
  })

  return {
    values: {
      tab,
      isError,
      isPending,
      isLoading: isLoadingStaff,
      staff: staff?.data.employees,
      search,
      files,
      isPendingFile,
    },
    handlers: {
      onMutate: mutateAsync,
      setSearch,
      setTab,
      mutateFile,
    },
  }
}
