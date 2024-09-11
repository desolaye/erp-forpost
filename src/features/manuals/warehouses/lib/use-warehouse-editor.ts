import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postCreateWarehouse, WarehouseValidatorType } from '@/entities/manuals'

interface IWarehouseEditorProps {
  id: string
  onClose?: () => void
}

export const useWarehouseEditor = (props: IWarehouseEditorProps) => {
  const { id, onClose } = props

  const queryClient = useQueryClient()

  // const { data: warehouse, isLoading } = useQuery({
  //   queryFn: () => getWarehouseById(id),
  //   queryKey: ['warehouse_by_id', id],
  //   enabled: id !== 'new',
  // })

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: WarehouseValidatorType) => postCreateWarehouse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouse_by_id', id] })
      queryClient.invalidateQueries({ queryKey: ['warehouses_all'] })
      if (onClose) onClose()
    },
  })

  return {
    values: {
      warehouse: { id, name: '' },
      error,
      isPending,
      // isLoading,
    },
    handlers: {
      onMutate: mutateAsync,
    },
  }
}
