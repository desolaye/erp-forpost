import { useMutation, useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import {
  getTechcadByProductDevelopId,
  ProductStructureValidatorType,
  postCreateProductDevelop,
  ZProductStructureValidator,
} from '@/entities/manufacture'

export const useProductSetStructure = (
  productDevelopId: string,
  onClose?: () => void,
) => {
  const [quantityTotal, setQuantityTotal] = useState<number[]>([])

  const { data: techcardItems, isPending } = useQuery({
    queryKey: ['product_develop_techcard_item', productDevelopId],
    queryFn: () => getTechcadByProductDevelopId(productDevelopId),
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
      isPending,
      techcardItems,
    },
    handlers: {
      handleSubmit,
      onSubmit,
      control,
    },
  }
}
