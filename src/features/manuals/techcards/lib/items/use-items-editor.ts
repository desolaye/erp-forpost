import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useSearch } from '@/shared/lib/use-search'

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

  const { filters, search, setSearch, debouncedSearch } = useSearch('name')

  const { data: items, isPending: isPendingItems } = useQuery({
    queryKey: ['items_all', debouncedSearch],
    queryFn: () => getProductsManual({ params: { limit: 8, skip: 0 }, filters }),
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
      search,
    },
    handlers: {
      mutateAsync,
      setSearch,
    },
  }
}
