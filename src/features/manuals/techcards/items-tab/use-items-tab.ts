import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useSearch } from '@/shared/lib/use-search'

import {
  deleteItemTechcard,
  postAddItemToTechcard,
  putEditItemTechcard,
  TechcardItemType,
} from '@/entities/manuals/techcards'

import { getProductsManual, productsToOptions } from '@/entities/manuals'

type ItemsTabProps = {
  cardId?: string
  items?: TechcardItemType[]
}

export const useItemsTab = (props: ItemsTabProps) => {
  const { items, cardId } = props

  const queryClient = useQueryClient()

  const [editItems, setEditItems] = useState(
    items?.map((v) => ({ ...v, quantity: v.quantity.toString() })) || [],
  )

  const { debouncedSearch, filters, setSearch } = useSearch('name')

  const { data } = useQuery({
    queryFn: () => getProductsManual({ skip: 0, limit: 20, name: filters?.filterValues }),
    queryKey: ['products_all', debouncedSearch],
  })

  const mutateAdd = useMutation({
    mutationFn: (props: { quantity: string; productId: string }) =>
      postAddItemToTechcard({
        techCardId: cardId || '',
        quantity: Number(props.quantity),
        productId: props.productId,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['techcard_composition_by_id', cardId] }),
  })

  const mutateEdit = useMutation({
    mutationFn: (props: { quantity: string; productId: string; id: string }) =>
      putEditItemTechcard({
        techCardId: cardId || '',
        ...props,
        quantity: Number(props.quantity),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['techcard_composition_by_id', cardId] }),
  })

  const mutateDelete = useMutation({
    mutationFn: deleteItemTechcard,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['techcard_composition_by_id', cardId] }),
  })

  const onAdd = () => {
    setEditItems((prev) => [
      ...prev,
      {
        id: `${new Date().toISOString()}`,
        productId: '',
        productName: 'Выберите продукт...',
        quantity: '0',
        techCardId: cardId || '',
      },
    ])
  }

  const onDelete = (id: string) => {
    setEditItems((prev) => prev.filter((v) => v.id !== id))
  }

  const onEditQuantity = (id: string, value: string) => {
    setEditItems((prev) => {
      const idx = prev.findIndex((v) => v.id === id)
      if (idx === -1) return prev

      const newArray = [...prev]
      newArray[idx] = { ...newArray[idx], quantity: value }
      return newArray
    })
  }

  const onEditProduct = (id: string, product: { label: string; value: string }) => {
    setEditItems((prev) => {
      const idx = prev.findIndex((v) => v.id === id)
      if (idx === -1) return prev

      const newArray = [...prev]
      newArray[idx] = {
        ...newArray[idx],
        productId: product.value,
        productName: product.label,
      }
      return newArray
    })
  }

  const onMutate = () => {
    const toAdd = editItems.filter((v) => items?.findIndex((i) => i.id === v.id) === -1)
    const toEdit = editItems.filter((v) => items?.findIndex((i) => i.id === v.id) !== -1)
    const toDelete =
      items?.filter((v) => editItems.findIndex((i) => i.id === v.id) === -1) || []

    toAdd.forEach(async (v) => await mutateAdd.mutateAsync({ ...v }))
    toEdit.forEach(async (v) => await mutateEdit.mutateAsync({ ...v }))
    toDelete.forEach(async (v) => await mutateDelete.mutateAsync(v.id))
  }

  return {
    values: {
      editItems,
      products: productsToOptions(data?.data.items),
      isError: mutateAdd.isError || mutateEdit.isError || mutateDelete.isError,
      isPending: mutateAdd.isPending || mutateEdit.isPending || mutateDelete.isPending,
    },
    handlers: {
      setEditItems,
      onAdd,
      onDelete,
      onSearch: setSearch,
      onEditQuantity,
      onEditProduct,
      onMutate,
    },
  }
}
