import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  staffToOptions,
  StaffType,
  WarehouseType,
  WarehouseValidatorType,
  ZWarehouseValidator,
} from '@/entities/manuals'

interface IUseWarehouseForm {
  warehouse?: WarehouseType
  staff?: StaffType[]
  onMutate: (data: WarehouseValidatorType) => void
}

export const useWarehouseForm = (props: IUseWarehouseForm) => {
  const { warehouse, staff, onMutate } = props

  const defaultResponsible = staff?.find((v) => v.id === warehouse?.responsibleId)
  const label = defaultResponsible
    ? `${defaultResponsible?.lastName} ${defaultResponsible?.firstName}`
    : undefined

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
    defaultValues: {
      id: warehouse?.id || '',
      name: warehouse?.name,
      responsibleId: {
        label,
        value: defaultResponsible?.id,
      },
    },
  })

  const onSubmit: SubmitHandler<WarehouseValidatorType> = onMutate

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    control,
    users: staffToOptions(staff),
  }
}
