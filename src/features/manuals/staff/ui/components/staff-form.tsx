import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { StaffValidatorType } from '@/entities/manuals'

import { useStaffForm } from '../../lib/use-staff-form'

interface IStaffFormProps {
  staff: StaffValidatorType
  roles?: { label: string; value: string }[]
  onMutate: (data: StaffValidatorType) => void
  onClose: () => void
}

type FormItemType = {
  label: string
  key: keyof StaffValidatorType
}

export const StaffForm = (props: IStaffFormProps) => {
  const { staff, roles } = props

  const { register, errors, control, handleSubmit, onReset, onSubmit } =
    useStaffForm(props)

  const formItems: FormItemType[] = [
    { label: 'Фамилия', key: 'lastName' },
    { label: 'Имя', key: 'firstName' },
    { label: 'Отчество', key: 'patronymic' },
    { label: 'Почта', key: 'email' },
    { label: 'Номер телефона', key: 'phoneNumber' },
    { label: 'Должность', key: 'post' },
    { label: 'Пароль', key: 'password' },
  ]

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      withButtons
      saveDisabled={Boolean(staff?.id)}
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

      <Text>Выберите роль сотрудника в ERP</Text>
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
