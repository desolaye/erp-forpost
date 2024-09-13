import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'

import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { StaffValidatorType } from '@/entities/manuals'

import { useStaffForm } from '../../lib/use-staff-form'

interface IStaffFormProps {
  id: string
  roles?: { label: string; value: string }[]
  onMutate: (data: StaffValidatorType) => void
  onClose: () => void
}

export const StaffForm = (props: IStaffFormProps) => {
  const { id, roles, onMutate, onClose } = props

  const { register, errors, control, handleSubmit, onReset, onSubmit } = useStaffForm({
    onMutate,
    onClose,
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
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
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="submit" disabled={id !== 'new'} full>
          Сохранить
        </Button>
        <Button type="reset" full mode="secondary">
          Отменить
        </Button>
      </div>
    </Form>
  )
}
