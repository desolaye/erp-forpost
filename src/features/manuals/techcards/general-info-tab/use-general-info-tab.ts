import { FormEvent, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { putEditTechcardInfo } from '@/entities/manuals/techcards'
import { getProductsManual, productsToOptions } from '@/entities/manuals'
import { useSearch } from '@/shared/lib/use-search'

type GeneralInfoTabProps = {
  cardId?: string
  number?: string
  product?: { value: string; label: string }
  description?: string
}

export const useGeneralInfoTab = (props: GeneralInfoTabProps) => {
  const { cardId, description, number, product } = props

  const queryClient = useQueryClient()

  const [editNumber, setEditNumber] = useState(number || '')
  const [editDescription, setEditDescription] = useState(description || '')
  const [selectedProduct, setSelectedProduct] = useState(product)

  const { debouncedSearch, filters, search, setSearch } = useSearch('name')

  const { data } = useQuery({
    queryFn: () => getProductsManual({ skip: 0, limit: 20, name: filters?.filterValues }),
    queryKey: ['products_all', debouncedSearch],
  })

  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: putEditTechcardInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techcard_composition_by_id', cardId] })
      queryClient.invalidateQueries({ queryKey: ['techcards_all'] })
    },
  })

  const onEditTechcard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutateAsync({
      description: editDescription,
      id: cardId || '',
      number: editNumber,
      productId: selectedProduct?.value || '',
    })
  }

  return {
    values: {
      products: productsToOptions(data?.data.items),
      editNumber,
      editDescription,
      selectedProduct,
      search,
      isPending,
      isError,
    },
    handlers: {
      setEditDescription,
      setEditNumber,
      setSelectedProduct,
      editTechcard: onEditTechcard,
      setSearch,
    },
  }
}
