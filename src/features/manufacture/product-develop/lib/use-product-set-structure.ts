import { useMutation, useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import {
  getTechcadByProductDevelopId,
  ProductStructureValidatorType,
  postCreateProductDevelop,
  ZProductStructureValidator,
  getProductsCompletedId,
} from '@/entities/manufacture'

export const useProductSetStructure = (
  productDevelopId: string,
  onClose?: () => void,
) => {
  const [quantityTotal, setQuantityTotal] = useState<number[]>([])

  const { data: techcardItems, isPending } = useQuery({
    queryFn: () => getTechcadByProductDevelopId(productDevelopId),
    queryKey: ['product_develop_techcard_item', productDevelopId],
  })

  const productsId = techcardItems?.map((v) => v.productId) || []

  const { data: productsCompleted, isPending: isPendingProducts } = useQuery({
    queryFn: () => Promise.all(productsId?.map((v) => getProductsCompletedId(v))),
    queryKey: ['product_completed', productsId],
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: ProductStructureValidatorType) =>
      postCreateProductDevelop({
        ...data,
        completedProductsId: data.completedProductsId.map((v) => v.value),
      }),
    onSuccess: () => onClose?.(),
  })

  const onSubmit: SubmitHandler<ProductStructureValidatorType> = (data) =>
    mutateAsync(data)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductStructureValidatorType>({
    resolver: zodResolver(ZProductStructureValidator),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'completedProductsId',
  })

  const getOptions = (idx: number) => {
    if (!productsCompleted) return []
    return productsCompleted.at(idx) || []
  }

  useEffect(() => {
    if (techcardItems) {
      remove()

      const total = techcardItems.reduce<number[]>(
        (prev, curr, i) => [...prev, curr.quantity + (prev[i - 1] || 0)],
        [],
      )

      new Array(total[total.length - 1])
        .fill(0)
        .forEach(() => append({ label: '', value: '' }))

      setQuantityTotal(total)
    }
  }, [techcardItems])

  return {
    values: {
      errors,
      fields,
      quantityTotal,
      isPending: isPending || isPendingProducts,
      techcardItems,
      productsCompleted,
    },
    handlers: {
      handleSubmit,
      register,
      onSubmit,
      getOptions,
      control,
    },
  }
}
