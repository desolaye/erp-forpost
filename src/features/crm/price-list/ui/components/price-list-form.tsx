import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'

import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { PriceListValidatorType } from '@/entities/crm/price-list'

import { usePriceListFormForm } from '../../lib/use-price-list-form'
import { Input } from '@/shared/ui/input'

interface IPriceListFormProps {
  priceList?: PriceListValidatorType
  operations?: { label: string; value: string }[]
  products?: { label: string; value: string }[]

  onMutate: (data: PriceListValidatorType) => void
  onSearch: (search: string) => void
  onClose?: () => void
}

export const PriceListForm = (props: IPriceListFormProps) => {
  const { priceList, operations, products, onSearch } = props

  const { register, errors, control, handleSubmit, onReset, onSubmit } =
    usePriceListFormForm(props)

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      saveDisabled={Boolean(priceList)}
      withButtons
    >
      <Text>Продукт</Text>
      <Controller
        name="productId"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            onInputChange={onSearch}
            options={products}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.productId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />
      {errors.productId && (
        <Text size="sm" color="error">
          Необходимо выбрать продукт
        </Text>
      )}

      <Text>Операция над продуктом</Text>
      <Controller
        name="operationId"
        control={control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={operations}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !errors.operationId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />
      {errors.operationId && (
        <Text size="sm" color="error">
          Необходимо выбрать операцию
        </Text>
      )}

      <Input
        placeholder="Стоимость операции"
        label="Стоимость операции"
        isError={Boolean(errors.price)}
        helper={errors.price?.message}
        {...register('price')}
      />
    </Form>
  )
}
