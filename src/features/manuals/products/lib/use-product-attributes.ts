import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { getAttributesAll, attributesToOptions } from '@/entities/attributes'
import {
  deleteProductAttributesById,
  getProductAttributesById,
  postAddProductAttribute,
  putEditProductAttributeValues,
} from '@/entities/manuals'

type HookProps = {
  productId: string
}

export const useProductAttributes = (props: HookProps) => {
  const { productId } = props

  const queryClient = useQueryClient()

  const [isAddingAttr, setIsAddingAttr] = useState(false)
  const [attrOpened, setAttrOpened] = useState('')

  const [currentAttr, setCurrentAttr] = useState({
    label: 'Выберите атрибут...',
    value: '',
  })

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['product_attributes', productId] })

    setIsAddingAttr(false)
    setCurrentAttr({
      label: 'Выберите атрибут...',
      value: '',
    })
  }

  const { data: attrAll, isFetching: isFetchingAttrAll } = useQuery({
    queryFn: () => getAttributesAll(),
    queryKey: ['attributes_all'],
    refetchOnWindowFocus: false,
  })

  const { data: productAttr, isFetching: isFetchingProductAttr } = useQuery({
    queryFn: () => getProductAttributesById(productId),
    queryKey: ['product_attributes', productId],
    refetchOnWindowFocus: false,
  })

  const filteredAttrs = useMemo(() => {
    return attributesToOptions(
      attrAll?.filter(
        (v) => productAttr?.findIndex((k) => k.attributeId === v.id) === -1,
      ),
    )
  }, [attrAll, productAttr])

  const mutateAddAttr = useMutation({
    mutationFn: (attributeId: string) =>
      postAddProductAttribute({ productId, attributeId }),
    onSuccess,
  })

  const mutateDeleteAttr = useMutation({
    mutationFn: deleteProductAttributesById,
    onSuccess,
  })

  const mutateEditAttrValues = useMutation({
    mutationFn: putEditProductAttributeValues,
    onSuccess,
  })

  return {
    values: {
      attrAll,
      filteredAttrs,
      productAttr,
      isAddingAttr,
      currentAttr,
      attrOpened,
      isLoading:
        isFetchingAttrAll ||
        isFetchingProductAttr ||
        mutateAddAttr.isPending ||
        mutateEditAttrValues.isPending ||
        mutateDeleteAttr.isPending,
    },
    handlers: {
      setCurrentAttr,
      setIsAddingAttr,
      setAttrOpened,
      addAttr: mutateAddAttr.mutateAsync,
      deleteAttr: mutateDeleteAttr.mutateAsync,
      editAttrValue: mutateEditAttrValues.mutateAsync,
    },
  }
}
