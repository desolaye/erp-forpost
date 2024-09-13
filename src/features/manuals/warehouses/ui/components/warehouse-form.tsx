import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'

import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { StaffType, WarehouseValidatorType } from '@/entities/manuals'
import { useWarehouseForm } from '../../lib/use-warehouse-form'

interface IWarehouseFormProps {
  id: string
  name: string
  staff?: StaffType[]
  onMutate: (data: WarehouseValidatorType) => void
  onClose: () => void
}

export const WarehouseForm = (props: IWarehouseFormProps) => {
  const { id, name, staff, onMutate, onClose } = props

  const { register, errors, control, users, handleSubmit, onReset, onSubmit } =
    useWarehouseForm({
      name,
      staff,
      onMutate,
      onClose,
    })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <Input
        placeholder="Название склада"
        label="Название склада"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />
      <Controller
        name="responsibleId"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={users}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.responsibleId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />

      {errors.responsibleId && (
        <Text size="sm" color="error">
          Необходимо выбрать ответственного
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
