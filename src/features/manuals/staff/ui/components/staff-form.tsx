import { Controller } from 'react-hook-form'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Select } from '@/shared/ui/select'

import { StaffValidatorType } from '@/entities/manuals'

import { useStaffForm } from '../../lib/use-staff-form'

interface IStaffFormProps {
  staff: StaffValidatorType
  isPending?: boolean
  isError?: boolean
  roles?: { label: string; value: string }[]
  onMutate: (data: StaffValidatorType) => void
  onClose: () => void
}

type FormItemType = {
  label: string
  key: keyof StaffValidatorType
}

export const StaffForm = (props: IStaffFormProps) => {
  const { roles = [], isError, staff, isPending } = props

  const { register, errors, control, handleSubmit, onReset, onSubmit } =
    useStaffForm(props)

  const formItems: FormItemType[] = [
    { label: 'Фамилия', key: 'lastName' },
    { label: 'Имя', key: 'firstName' },
    { label: 'Отчество', key: 'patronymic' },
    { label: 'Почта', key: 'email' },
    { label: 'Номер телефона', key: 'phoneNumber' },
    { label: 'Должность', key: 'post' },
  ]

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      withButtons
      pending={isPending}
      error={isError}
    >
      {formItems.map((v) => (
        <Input
          key={v.key}
          placeholder={v.label}
          label={v.label}
          isError={Boolean(errors[v.key])}
          helper={errors[v.key]?.message}
          {...register(v.key)}
        />
      ))}

      {!Boolean(staff.id) && (
        <Input
          placeholder="Пароль"
          label="Пароль"
          isError={Boolean(errors.password)}
          helper={errors.password?.message}
          {...register('password')}
        />
      )}

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            errorMsg={errors.role && 'Необходимо выбрать роль'}
            label="Роль сотрудника в ERP системе"
            placeholder="Выберите роль сотрудника в ERP"
            options={roles}
          />
        )}
      />
    </Form>
  )
}
