import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

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

type CurrentAttr = {
  name: string
  id: string
  options: { value: string; label: string }[]
}

export const useProductAttributes = (props: HookProps) => {
  const { productId } = props

  const queryClient = useQueryClient()
  const [currentAttrs, setCurrentAttrs] = useState<CurrentAttr[]>()

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['product_attributes', productId] })
  }

  const { data: attrAll, isFetching: isFetchingAttrAll } = useQuery({
    queryFn: getAttributesAll,
    queryKey: ['attributes_all'],
    refetchOnWindowFocus: false,
  })

  const { data: productAttr, isFetching: isFetchingProductAttr } = useQuery({
    queryFn: () => getProductAttributesById(productId),
    queryKey: ['product_attributes', productId],
    refetchOnWindowFocus: false,
  })

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

  const selectAttr = (
    attrName: string,
    attrId: string,
    option: { label: string; value: string }[],
  ) => {
    setCurrentAttrs((prev) => {
      const attr = prev?.find((k) => k.name === attrName)

      if (!attr) return [...(prev || []), { id: attrId, name: attrName, options: option }]

      return [
        ...(prev?.filter((v) => v.name !== attrName) || []),
        { id: attr.id, name: attrName, options: option },
      ]
    })
  }

  const saveAttrs = () => {
    const toSave = currentAttrs?.filter(
      (v) => productAttr?.findIndex((pr) => pr.attributeName === v.name) === -1,
    )

    const toDelete = currentAttrs
      ?.filter((v) => productAttr?.findIndex((pr) => pr.attributeName === v.name) !== -1)
      .filter((v) => v.options.length === 0)

    const toEdit = currentAttrs
      ?.filter((v) => productAttr?.findIndex((pr) => pr.attributeName === v.name) !== -1)
      .filter((v) => v.options.length > 0)

    if (toSave) {
      toSave.forEach((v) =>
        mutateAddAttr.mutateAsync(v.id).then((productAttrId) =>
          mutateEditAttrValues.mutateAsync({
            productAttrId,
            values: v.options.map((opt) => opt.value),
          }),
        ),
      )
    }

    if (toDelete) {
      toDelete.forEach((v) => mutateDeleteAttr.mutateAsync(v.id))
    }

    if (toEdit) {
      toEdit.forEach((v) =>
        mutateEditAttrValues.mutateAsync({
          productAttrId: v.id,
          values: v.options.map((opt) => opt.value),
        }),
      )
    }
  }

  useEffect(() => {
    if (productAttr) {
      setCurrentAttrs(
        productAttr.map((v) => ({
          id: v.id,
          name: v.attributeName,
          options: v.values.map((opt) => ({ label: opt, value: opt })),
        })),
      )
    }
  }, [productAttr])

  return {
    values: {
      attrAll: attributesToOptions(attrAll),
      currentAttrs,
      productAttr,
      isLoading:
        isFetchingAttrAll ||
        isFetchingProductAttr ||
        mutateAddAttr.isPending ||
        mutateEditAttrValues.isPending ||
        mutateDeleteAttr.isPending,
    },
    handlers: {
      saveAttrs,
      selectAttr,
    },
  }
}
