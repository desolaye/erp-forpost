import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getStaffManual,
  postCreateWarehouse,
  WarehouseValidatorType,
} from '@/entities/manuals'

interface IWarehouseEditorProps {
  id: string
  onClose?: () => void
}

export const useWarehouseEditor = (props: IWarehouseEditorProps) => {
  const { id, onClose } = props

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: WarehouseValidatorType) => postCreateWarehouse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouse_by_id', id] })
      queryClient.invalidateQueries({ queryKey: ['warehouses_all'] })
      if (onClose) onClose()
    },
  })

  const { data: staff, isLoading: isLoadingStaff } = useQuery({
    queryFn: () => getStaffManual({ params: { limit: 1000, skip: 0 } }),
    queryKey: ['staff_all'],
  })

  return {
    values: {
      warehouse: { id, name: '' },
      error,
      isPending,
      isLoading: isLoadingStaff,
      staff: staff?.data.employees,
    },
    handlers: {
      onMutate: mutateAsync,
    },
  }
}
