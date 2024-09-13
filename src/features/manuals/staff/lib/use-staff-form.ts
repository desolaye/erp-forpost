import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { StaffValidatorType, ZStaffValidator } from '@/entities/manuals'
import { createInitialStaff } from '../utils/create-initial-staff'

interface IUseStaffForm {
  onMutate: (data: StaffValidatorType) => void
  onClose: () => void
}

export const useStaffForm = (props: IUseStaffForm) => {
  const { onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StaffValidatorType>({
    resolver: zodResolver(ZStaffValidator),
    defaultValues: createInitialStaff(),
  })

  const onSubmit: SubmitHandler<StaffValidatorType> = onMutate
  const onReset = onClose

  return {
    register,
    handleSubmit,
    onSubmit,
    onReset,
    errors,
    control,
  }
}
