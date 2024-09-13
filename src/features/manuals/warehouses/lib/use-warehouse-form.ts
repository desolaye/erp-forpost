import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  StaffType,
  WarehouseValidatorType,
  ZWarehouseValidator,
} from '@/entities/manuals'

import { getStaffOptions } from '../utils/get-staff-options'

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
    control,
    users: getStaffOptions(staff),
  }
}
