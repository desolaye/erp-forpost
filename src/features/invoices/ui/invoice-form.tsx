import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'
import Textarea from '@mui/joy/Textarea'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import dayjs from 'dayjs'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { JoyUiProvider } from '@/shared/lib/joy-ui-provider'

import { useInvoiceForm } from '../lib/use-invoice-form'
import { getPaymentStatusOptions } from '../utils/get-payment-status-options'
import { getPriorityStatusOptions } from '../utils/get-priority-status-options'

import { InvoiceValidatorType } from '@/entities/invoices'

interface IInvoiceFormProps {
  agents: { label: string; value: string }[]
  products: { label: string; value: string }[]

  isLoading?: boolean
  isError?: boolean

  onClose?: () => void
  onMutate?: (data: InvoiceValidatorType) => void
}

export const InvoiceForm = (props: IInvoiceFormProps) => {
  const { agents, products, isError, isLoading, onClose } = props
  const { handlers, values } = useInvoiceForm(props)

  return (
    <Form
      error={isError}
      pending={isLoading}
      withButtons
      onSubmit={handlers.handleSubmit(handlers.onSubmit)}
      onReset={() => onClose?.()}
    >
      <Input
        placeholder="Номер счёта"
        label="Номер счёта"
        isError={Boolean(values.errors.number)}
        helper={values.errors.number?.message}
        {...handlers.register('number')}
      />

      <Text>Описание счёта</Text>

      <JoyUiProvider>
        <Textarea
          {...handlers.register('description')}
          placeholder="Описание счёта"
          minRows={4}
          variant="soft"
          sx={{ fontFamily: 'Montserrat' }}
        />
      </JoyUiProvider>

      {values.errors.description && (
        <Text size="sm" color="error">
          {values.errors.description?.message}
        </Text>
      )}

      <Text>Выберите контрагента</Text>
      <Controller
        name="contractorId"
        control={values.control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={agents}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !values.errors.contractorId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />
      {values.errors.contractorId && (
        <Text size="sm" color="error">
          Необходимо выбрать контрагента
        </Text>
      )}

      <Text>Выберите тип оплаты</Text>
      <Controller
        name="paymentStatus"
        control={values.control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={getPaymentStatusOptions()}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !values.errors.paymentStatus ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />

      {values.errors.paymentStatus && (
        <Text size="sm" color="error">
          Необходимо выбрать тип оплаты
        </Text>
      )}

      <Text>Выберите приоритет счёта</Text>
      <Controller
        name="priority"
        control={values.control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={getPriorityStatusOptions()}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !values.errors.priority ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />

      {values.errors.priority && (
        <Text size="sm" color="error">
          Необходимо выбрать приоритет
        </Text>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <Text>Актуальность счёта</Text>
        <Controller
          name="paymentDeadline"
          control={values.control}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              onChange={(v) => field.onChange(dayjs(v).toISOString())}
              defaultValue={dayjs()}
              value={dayjs(field.value)}
            />
          )}
        />

        {values.errors.paymentDeadline && (
          <Text size="sm" color="error">
            Необходимо выбрать дату
          </Text>
        )}
      </LocalizationProvider>

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
