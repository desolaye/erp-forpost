import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { StaffType, WarehouseType, WarehouseValidatorType } from '@/entities/manuals'
import { useWarehouseForm } from '../../lib/use-warehouse-form'

interface IWarehouseFormProps {
  id: string
  warehouse?: WarehouseType
  staff?: StaffType[]
  form?: {
    isPending: boolean
    isError: boolean
  }
  onMutate: (data: WarehouseValidatorType) => void
  onClose: () => void
  onSearch: (search: string) => void
}

export const WarehouseForm = (props: IWarehouseFormProps) => {
  const { id, form, onSearch } = props

  const { register, errors, control, users, handleSubmit, onReset, onSubmit } =
    useWarehouseForm(props)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      withButtons
      saveDisabled={id !== 'new'}
      error={form?.isError}
      pending={form?.isPending}
    >
      <Input
        placeholder="Название склада"
        label="Название склада"
        isError={Boolean(errors.name)}
        helper={errors.name?.message}
        {...register('name')}
      />

      <Text>Ответственный за склад</Text>
      <Controller
        name="responsibleId"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            onInputChange={onSearch}
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
    </Form>
  )
}
