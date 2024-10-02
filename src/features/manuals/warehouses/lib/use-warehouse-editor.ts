import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getStaffManual,
  postCreateWarehouse,
  WarehouseValidatorType,
} from '@/entities/manuals'
import { useSearch } from '@/shared/lib/use-search'

interface IWarehouseEditorProps {
  id: string
  onClose?: () => void
}

export const useWarehouseEditor = (props: IWarehouseEditorProps) => {
  const { id, onClose } = props

  const queryClient = useQueryClient()

  const { filters, search, setSearch, debouncedSearch } = useSearch('lastName')

  const { mutateAsync, isPending, error } = useMutation({
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
      warehouse: { id, name: '' },
      error,
      isPending,
      isLoading: isLoadingStaff,
      staff: staff?.data.employees,
      search,
    },
    handlers: {
      onMutate: mutateAsync,
      setSearch,
    },
  }
}
