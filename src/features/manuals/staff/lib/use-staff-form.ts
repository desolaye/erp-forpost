import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { StaffValidatorType, ZStaffValidator } from '@/entities/manuals'
import { useEffect } from 'react'

interface IUseStaffForm {
  onMutate: (data: StaffValidatorType) => void
  staff: StaffValidatorType
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
    resolver: zodResolver(ZStaffValidator),
    defaultValues: staff,
  })

  console.log(errors)

  const onSubmit: SubmitHandler<StaffValidatorType> = onMutate
  const onReset = onClose

  useEffect(() => {
    console.log('staff initial', staff)
  }, [])

  return {
    register,
    handleSubmit,
    onSubmit,
    onReset,
    errors,
    control,
  }
}
