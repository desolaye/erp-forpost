import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { StaffType, StaffValidatorType, ZStaffValidator } from '@/entities/manuals'
import { createInitialStaff } from '../utils/create-initial-staff'

interface IUseStaffForm {
  onMutate: (data: StaffValidatorType) => void
  staff?: StaffType
  onClose: () => void
}

export const useStaffForm = (props: IUseStaffForm) => {
  const { staff, onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StaffValidatorType>({
    resolver: zodResolver(
      ZStaffValidator.transform((data) => ({ ...data, role: data.role.label })),
    ),
    defaultValues: createInitialStaff(staff),
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
