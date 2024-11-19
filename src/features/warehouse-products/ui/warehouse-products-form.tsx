import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

import { ProductByWarehouseValidatorType, ProductResponseType } from '@/entities/manuals'

import { useWarehouseProductsForm } from '../lib/use-warehouse-products-form'

interface IWarehouseProductsFormProps {
  products?: ProductResponseType['items']
  onClose?: () => void
  onMutate: (product: ProductByWarehouseValidatorType) => void
  onSearch: (value: string) => void
}

export const WarehouseProductsForm = (props: IWarehouseProductsFormProps) => {
  const { onClose, onSearch } = props
  const { handlers, values } = useWarehouseProductsForm(props)

  return (
    <Form
      withButtons
      onReset={onClose}
      onSubmit={handlers.handleSubmit(handlers.onSubmit)}
    >
      <Text>Выбор продукта</Text>
      <Controller
        name="productId"
        control={values.control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={values.products}
            onInputChange={onSearch}
            placeholder={'Поиск по названию'}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !values.errors.productId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />

      {values.errors.productId && (
        <Text size="sm" color="error">
          Необходимо выбрать продукт
        </Text>
      )}

      <Input
        placeholder="Количество"
        label="Количество"
        isError={Boolean(values.errors.quantity)}
        helper={values.errors.quantity?.message}
        {...handlers.register('quantity')}
      />
    </Form>
  )
}
