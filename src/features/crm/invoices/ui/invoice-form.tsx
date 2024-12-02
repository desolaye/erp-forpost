import { Controller } from 'react-hook-form'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

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
import { Textarea } from '@/shared/ui/textarea'
import { Select } from '@/shared/ui/select'

import { InvoiceValidatorType } from '@/entities/crm/invoices'

import { useInvoiceForm } from '../lib/use-invoice-form'
import { getPaymentStatusOptions } from '../utils/get-payment-status-options'
import { getPriorityStatusOptions } from '../utils/get-priority-status-options'

type InvoiceFormProps = {
  agents: { label: string; value: string }[]
  products: { label: string; value: string }[]

  isLoading?: boolean
  isError?: boolean

  onClose?: () => void
  onMutate?: (data: InvoiceValidatorType) => void
}

export const InvoiceForm = (props: InvoiceFormProps) => {
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

      <Controller
        name="description"
        control={values.control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Описание счёта"
            placeholder="Описание счёта"
            errorMsg={values.errors.description?.message}
          />
        )}
      />

      <Controller
        name="contractorId"
        control={values.control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Выберите контрагента"
            label="Выберите контрагента"
            errorMsg={values.errors.contractorId && 'Необходимо выбрать контрагента'}
            options={agents}
          />
        )}
      />

      <Controller
        name="paymentStatus"
        control={values.control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Выберите тип оплаты"
            label="Выберите тип оплаты"
            errorMsg={values.errors.paymentStatus && 'Необходимо выбрать тип оплаты'}
            options={getPaymentStatusOptions()}
          />
        )}
      />

      <Controller
        name="priority"
        control={values.control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Выберите приоритет счёта"
            label="Выберите приоритет счёта"
            errorMsg={values.errors.priority && 'Необходимо выбрать приоритет'}
            options={getPriorityStatusOptions()}
          />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <Text>Актуальность счёта</Text>
        <Controller
          name="paymentDeadline"
          control={values.control}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              onChange={(v) => field.onChange(dayjs(v).toISOString())}
              defaultValue={null}
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
              style={{ padding: '2px 4px' }}
            >
              <DeleteOutlinedIcon style={{ width: 24, height: 24 }} />
            </Button>
          </header>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Controller
              name={`products.${i}.productId`}
              control={values.control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Выбор продукта"
                  options={products}
                  className="full"
                  errorMsg={
                    values.errors.products?.[i]?.productId && 'Необходимо выбрать продукт'
                  }
                />
              )}
            />

            <Input
              style={{ minWidth: 150, width: 150 }}
              placeholder="Количество"
              isError={Boolean(values.errors.products?.[i]?.quantity)}
              {...handlers.register(`products.${i}.quantity` as const)}
            />
          </div>
        </Card>
      ))}

      <Button type="button" mode="secondary" onClick={handlers.createField}>
        + Добавить продукт
      </Button>
    </Form>
  )
}
