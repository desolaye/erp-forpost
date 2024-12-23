import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useContext, useState } from 'react'

import { getProductsManual, productsToOptions } from '@/entities/manuals'
import { useSearch } from '@/shared/lib/use-search'
import { ModalLayoutContext } from '@/shared/ui/modal-layout'
import { postCreateTechcard } from '@/entities/manuals/techcards'

export const useTechcardCreator = () => {
  const context = useContext(ModalLayoutContext)
  const queryClient = useQueryClient()

  const [number, setNumber] = useState('')
  const [description, setDescription] = useState('')
  const [product, setProduct] = useState({ label: 'Выберите продукт...', value: '' })

  const { debouncedSearch, filters, search, setSearch } = useSearch('name')

  const { data: products } = useQuery({
    queryFn: () => getProductsManual({ skip: 0, limit: 20, name: filters?.filterValues }),
    queryKey: ['products_all', debouncedSearch],
  })

  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: postCreateTechcard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techcards_all'] })
      context.onClose?.()
    },
  })

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutateAsync({ description, number, productId: product.value })
  }

  const rejectForm = () => {
    context.onClose?.()
  }

  return {
    values: {
      products: productsToOptions(products?.data.items),
      product,
      number,
      description,
      search,
      isError,
      isPending,
    },
    handlers: {
      setNumber,
      setDescription,
      setProduct,
      setSearch,
      submitForm,
      rejectForm,
    },
  }
}
