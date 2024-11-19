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
    queryFn: () => getProductsManual({ limit: 50, skip: 0, name: filters?.filterValues }),
  })

  const {
    mutateAsync,
    isPending: isPendingCreation,
    isError,
  } = useMutation({
    mutationFn: (data: ItemValidatorType) =>
      postAddItemToCard({ ...data, techCardId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techcard_full', id] })
      if (onClose) onClose()
    },
  })

  return {
    values: {
      items: items?.data.items,
      isPendingCreation,
      isError,
      isPendingItems,
      search,
    },
    handlers: {
      mutateAsync,
      setSearch,
    },
  }
}
