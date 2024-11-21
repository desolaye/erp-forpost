import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'

import { putEditStaffPassword } from '@/entities/manuals'

interface IPasswordFormProps {
  staffId: string
  onClose: () => void
}

export const PasswordForm = (props: IPasswordFormProps) => {
  const { onClose, staffId } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({
    defaultValues: { password: '' },
  })

  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: putEditStaffPassword,
    onSuccess: () => onClose(),
  })

  const onSubmit: SubmitHandler<{ password: string }> = ({ password }) => {
    mutateAsync({ password, staffId })
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => onClose()}
      withButtons
      pending={isPending}
      error={isError}
    >
      <Input
        placeholder="Пароль"
        label="Пароль"
        isError={Boolean(errors.password)}
        helper={errors.password?.message}
        {...register('password')}
      />
    </Form>
  )
}
