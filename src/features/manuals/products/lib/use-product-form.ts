import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ProductValidatorType, ZProductValidator } from '@/entities/manuals'

interface IUseProductForm {
  data?: ProductValidatorType
  onMutate: (data: ProductValidatorType) => void
  onClose: () => void
}

export const useProductForm = (props: IUseProductForm) => {
  const { data, onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductValidatorType>({
    resolver: zodResolver(ZProductValidator),
    defaultValues: { name: data?.name || '', version: data?.version || '' },
  })

  const onSubmit: SubmitHandler<ProductValidatorType> = onMutate
  const onReset = onClose

  return {
    register,
    handleSubmit,
    onSubmit,
    onReset,
    errors,
  }
}
