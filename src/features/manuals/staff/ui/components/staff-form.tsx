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

export const StaffForm = (props: IStaffFormProps) => {
  const { roles = [], isError, staff, isPending } = props

  const { register, errors, control, handleSubmit, onReset, onSubmit } =
    useStaffForm(props)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      withButtons
      pending={isPending}
      error={isError}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        <Input
          placeholder="Фамилия"
          label="Фамилия"
          isError={Boolean(errors.lastName)}
          helper={errors.lastName?.message}
          style={{ minWidth: 0 }}
          full
          {...register('lastName')}
        />
        <Input
          placeholder="Имя"
          label="Имя"
          isError={Boolean(errors.firstName)}
          helper={errors.firstName?.message}
          style={{ minWidth: 0 }}
          full
          {...register('firstName')}
        />
        <Input
          placeholder="Отчество"
          label="Отчество"
          isError={Boolean(errors.patronymic)}
          helper={errors.patronymic?.message}
          style={{ minWidth: 0 }}
          full
          {...register('patronymic')}
        />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Input
          placeholder="Почта"
          label="Почта"
          isError={Boolean(errors.email)}
          helper={errors.email?.message}
          style={{ minWidth: 0 }}
          full
          {...register('email')}
        />
        <Input
          placeholder="Номер телефона"
          label="Номер телефона"
          isError={Boolean(errors.phoneNumber)}
          helper={errors.phoneNumber?.message}
          style={{ minWidth: 0 }}
          full
          {...register('phoneNumber')}
        />
      </div>

      <Input
        placeholder="Должность"
        label="Должность"
        isError={Boolean(errors.post)}
        helper={errors.post?.message}
        {...register('post')}
      />

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
