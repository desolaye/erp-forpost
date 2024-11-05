import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ProductType, ProductValidatorType, ZProductValidator } from '@/entities/manuals'

interface IUseProductForm {
  data?: ProductType
  onMutate: (data: ProductValidatorType) => void
  onClose: () => void
}

export const useProductForm = (props: IUseProductForm) => {
  const { data, onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProductValidatorType>({
    resolver: zodResolver(ZProductValidator),
    defaultValues: { name: data?.name || '', purchased: Boolean(data?.purchased) },
  })

  const onSubmit: SubmitHandler<ProductValidatorType> = onMutate
  const onReset = onClose

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    onReset,
    errors,
  }
}
