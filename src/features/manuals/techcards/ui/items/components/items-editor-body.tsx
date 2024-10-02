import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

import { ItemValidatorType, ProductType } from '@/entities/manuals'
import { useItemForm } from '../../../lib/items/use-item-form'

interface IItemsEditorBodyProps {
  products?: ProductType[]

  onMutate: (step: ItemValidatorType) => void
  onSearch: (search: string) => void
}

export const ItemsEditorBody = (props: IItemsEditorBodyProps) => {
  const { products, onMutate, onSearch } = props
  const { control, errors, handleSubmit, onSubmit, register } = useItemForm({ onMutate })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} withButtons>
      <Text>Выберите компонент</Text>
      <Controller
        name="productId"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            onInputChange={onSearch}
            options={products?.map((v) => ({ label: v.name, value: v.id }))}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.productId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />
      {errors.productId && <Text color="error">Необходимо выбрать компонент</Text>}

      <Input
        placeholder="Количество компонентов"
        label="Количество компонентов"
        isError={Boolean(errors.quantity)}
        helper={errors.quantity?.message}
        {...register('quantity')}
      />
    </Form>
  )
}
