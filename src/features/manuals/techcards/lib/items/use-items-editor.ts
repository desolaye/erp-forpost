import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getProductsManual,
  ItemValidatorType,
  postAddItemToCard,
} from '@/entities/manuals'

interface IUseItemsEditor {
  id: string
  onClose?: () => void
}

export const useItemsEditor = (props: IUseItemsEditor) => {
  const { id, onClose } = props
  const queryClient = useQueryClient()

  const { data: items, isPending: isPendingItems } = useQuery({
    queryKey: ['items_all'],
    queryFn: () => getProductsManual({ params: { limit: 1000, skip: 0 } }),
  })

  const { mutateAsync, isPending: isPendingCreation } = useMutation({
    mutationFn: (data: ItemValidatorType) =>
      postAddItemToCard({ ...data, techCardId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techcard_full', id] })
      if (onClose) onClose()
    },
  })

  return {
    values: {
      items: items?.data.products,
      isPendingCreation,
      isPendingItems,
    },
    handlers: {
      mutateAsync,
    },
  }
}
