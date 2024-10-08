import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'

import { InvoiceValidatorType } from '@/entities/invoices'
import { useInvoiceForm } from '../lib/use-invoice-form'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

interface IInvoiceFormProps {
  agents: { label: string; value: string }[]
  products: { label: string; value: string }[]

  onClose?: () => void
  onMutate?: (data: InvoiceValidatorType) => void
}

export const InvoiceForm = (props: IInvoiceFormProps) => {
  const { agents, products } = props
  const { handlers, values } = useInvoiceForm(props)

  return (
    <Form withButtons onSubmit={handlers.handleSubmit(handlers.onSubmit)}>
      <Input
        placeholder="Номер счёта"
        label="Номер счёта"
        isError={Boolean(values.errors.number)}
        helper={values.errors.number?.message}
        {...handlers.register('number')}
      />

      <Input
        placeholder="Описание счёта"
        label="Описание счёта"
        isError={Boolean(values.errors.description)}
        helper={values.errors.description?.message}
        {...handlers.register('description')}
      />

      <Input
        placeholder="Дней до отгрузки"
        label="Дней до отгрузки"
        isError={Boolean(values.errors.daysShipment)}
        helper={values.errors.daysShipment?.message}
        {...handlers.register('daysShipment')}
      />

      <Input
        placeholder="Процент оплаты"
        label="Процент оплаты"
        isError={Boolean(values.errors.paymentPercentage)}
        helper={values.errors.daysShipment?.message}
        {...handlers.register('paymentPercentage')}
      />

      <Text>Выберите контрагента</Text>
      <Controller
        name="contragentId"
        control={values.control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={agents}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !values.errors.contragentId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />
      {values.errors.contragentId && (
        <Text size="sm" color="error">
          Необходимо выбрать контрагента
        </Text>
      )}

      {values.fields.map((f, i) => (
        <Card key={f.id}>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text weight="semi">Продукт №{i + 1}</Text>
            <Button
              mode="secondary"
              type="button"
              onClick={() => handlers.removeField(i)}
            >
              Удалить
            </Button>
          </header>

          <Text>Выбор продукта</Text>
          <Controller
            name={`products.${i}.productId`}
            control={values.control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                options={products}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: !values.errors.products?.[i]?.productId
                      ? 'grey'
                      : '#830000',
                  }),
                }}
              />
            )}
          />
          {values.errors.products?.[i]?.productId && (
            <Text size="sm" color="error">
              Необходимо выбрать продукт
            </Text>
          )}

          <Input
            placeholder="Количество продуктов"
            label="Количество продуктов"
            isError={Boolean(values.errors.products?.[i]?.quantity)}
            {...handlers.register(`products.${i}.quantity` as const)}
          />
        </Card>
      ))}

      <Button type="button" mode="secondary" onClick={handlers.createField}>
        Добавить продукт
      </Button>
    </Form>
  )
}
