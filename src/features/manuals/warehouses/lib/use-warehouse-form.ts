import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  staffToOptions,
  StaffType,
  WarehouseValidatorType,
  ZWarehouseValidator,
} from '@/entities/manuals'

interface IUseWarehouseForm {
  name: string
  staff?: StaffType[]
  onMutate: (data: WarehouseValidatorType) => void
  onClose: () => void
}

export const useWarehouseForm = (props: IUseWarehouseForm) => {
  const { name, staff, onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<WarehouseValidatorType>({
    resolver: zodResolver(
      ZWarehouseValidator.transform((data) => ({
        ...data,
        responsibleId: data.responsibleId.value,
      })),
    ),
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
    control,
    users: staffToOptions(staff),
  }
}
