import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { WarehouseValidatorType, ZWarehouseValidator } from '@/entities/manuals'

interface IUseWarehouseForm {
  name: string
  onMutate: (data: WarehouseValidatorType) => void
  onClose: () => void
}

export const useWarehouseForm = (props: IUseWarehouseForm) => {
  const { name, onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WarehouseValidatorType>({
    resolver: zodResolver(ZWarehouseValidator),
    defaultValues: { name },
  })

  const onSubmit: SubmitHandler<WarehouseValidatorType> = onMutate
  const onReset = onClose

  return {
    register,
    handleSubmit,
    onSubmit,
    onReset,
    errors,
  }
}
