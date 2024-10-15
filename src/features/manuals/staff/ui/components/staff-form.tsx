import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { StaffType, StaffValidatorType } from '@/entities/manuals'

import { useStaffForm } from '../../lib/use-staff-form'

interface IStaffFormProps {
  id: string
  staff?: StaffType
  roles?: { label: string; value: string }[]
  onMutate: (data: StaffValidatorType) => void
  onClose: () => void
}

export const StaffForm = (props: IStaffFormProps) => {
  const { id, roles } = props

  const { register, errors, control, handleSubmit, onReset, onSubmit } =
    useStaffForm(props)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      withButtons
      saveDisabled={id !== 'new'}
    >
      <Input
        placeholder="Фамилия"
        label="Фамилия"
        isError={Boolean(errors.lastName)}
        helper={errors.lastName?.message}
        {...register('lastName')}
      />
      <Input
        placeholder="Имя"
        label="Имя"
        isError={Boolean(errors.firstName)}
        helper={errors.firstName?.message}
        {...register('firstName')}
      />
      <Input
        placeholder="Почта"
        label="Почта"
        isError={Boolean(errors.email)}
        helper={errors.email?.message}
        {...register('email')}
      />
      <Input
        placeholder="Номер телефона"
        label="Номер телефона"
        isError={Boolean(errors.phoneNumber)}
        helper={errors.phoneNumber?.message}
        {...register('phoneNumber')}
      />
      <Input
        placeholder="Пост"
        label="Пост"
        isError={Boolean(errors.post)}
        helper={errors.post?.message}
        {...register('post')}
      />

      <Input
        placeholder="Пароль сотрудника"
        label="Пароль сотрудника"
        isError={Boolean(errors.password)}
        helper={errors.password?.message}
        {...register('password')}
      />

      <Text>Выберите роль сотрудника</Text>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={roles}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.role ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />

      {errors.role && (
        <Text size="sm" color="error">
          Необходимо выбрать роль
        </Text>
      )}
    </Form>
  )
}
