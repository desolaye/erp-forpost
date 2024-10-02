import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ItemValidatorType, ZItemValidator } from '@/entities/manuals'

interface IUseItemForm {
  onMutate: (step: ItemValidatorType) => void
}

export const useItemForm = (props: IUseItemForm) => {
  const { onMutate } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ItemValidatorType>({
    resolver: zodResolver(
      ZItemValidator.transform((data) => ({ ...data, productId: data.productId.value })),
    ),
  })

  const onSubmit: SubmitHandler<ItemValidatorType> = onMutate

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    control,
  }
}
