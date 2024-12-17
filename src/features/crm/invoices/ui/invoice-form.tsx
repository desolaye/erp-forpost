import { Controller } from 'react-hook-form'
import { Tab, Tabs } from '@mui/material'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Textarea } from '@/shared/ui/textarea'
import { Select } from '@/shared/ui/select'
import { DatetimePicker } from '@/shared/ui/datetime-picker'

import { InvoiceValidatorType } from '@/entities/crm/invoices'

import { useInvoiceForm } from '../lib/use-invoice-form'
import { getPaymentStatusOptions } from '../utils/get-payment-status-options'
import { getPriorityStatusOptions } from '../utils/get-priority-status-options'

type InvoiceFormProps = {
  agents: { label: string; value: string }[]
  products: { label: string; value: string }[]

  isLoading?: boolean
  isError?: boolean

  onProductSearch?: (val: string) => void
  onAgentSearch?: (val: string) => void

  onClose?: () => void
  onMutate?: (data: InvoiceValidatorType) => void
}

export const InvoiceForm = (props: InvoiceFormProps) => {
  const {
    agents,
    products,
    isError,
    isLoading,
    onClose,
    onAgentSearch,
    onProductSearch,
  } = props

  const { handlers, values } = useInvoiceForm(props)

  return (
    <Form
      error={isError}
      pending={isLoading}
      withButtons={values.tab === 'data' && values.fields.length > 0}
      onSubmit={handlers.handleSubmit(handlers.onSubmit)}
      onReset={() => onClose?.()}
    >
      <Tabs value={values.tab} onChange={(_, v) => handlers.setTab(v)}>
        <Tab label="Данные" value="data" />
        <Tab label="Продукты" value="products" />
      </Tabs>

      {values.tab === 'data' && (
        <>
          <Input
            placeholder="Номер счёта"
            label="Номер счёта"
            isError={Boolean(values.errors.number)}
            helper={values.errors.number?.message || 'Указывать в формате XXXX, без года'}
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
                onSearch={onAgentSearch}
                isClearable
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

          <Controller
            name="paymentDeadline"
            control={values.control}
            render={({ field }) => (
              <DatetimePicker
                {...field}
                errorMsg={values.errors.paymentDeadline && 'Необходимо выбрать дату'}
                label="Актуальность счёта"
              />
            )}
          />
          <Text size="sm" color={values.fields.length < 1 ? 'error' : 'primary'}>
            Убедитесь, что добавили все необходимые продукты
          </Text>
        </>
      )}

      {values.tab === 'products' && (
        <div
          style={{
            padding: '0 0 100px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <Button type="button" mode="secondary" onClick={handlers.createField}>
            + Добавить продукт
          </Button>

          {values.fields.map((f, i) => (
            <Card
              key={f.id}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                border: '1px solid #999',
              }}
            >
              <Text weight="semi">№{i + 1}</Text>
              <Controller
                name={`products.${i}.productId`}
                control={values.control}
                render={({ field }) => (
                  <Select
                    {...field}
                    onSearch={onProductSearch}
                    isClearable
                    placeholder="Выбор продукта"
                    options={products}
                    className="full"
                    errorMsg={
                      values.errors.products?.[i]?.productId &&
                      'Необходимо выбрать продукт'
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

              <Button
                mode="secondary"
                type="button"
                onClick={() => handlers.removeField(i)}
                style={{ padding: '2px 4px' }}
              >
                <DeleteOutlinedIcon style={{ width: 32, height: 32 }} />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </Form>
  )
}
