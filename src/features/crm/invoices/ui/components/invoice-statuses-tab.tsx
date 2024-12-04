import { MenuItem, Select, Slider } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import dayjs from 'dayjs'

import { useEffect, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'

import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { InvoiceType } from '@/entities/crm/invoices'

import cls from '../invoice-detailed.module.scss'

type InvoiceStatusesTabProps = {
  editShipment: (shipment: string) => void
  editClosingDate: (date: string) => void
  editPayment: (status: number) => void
  editPriority: (status: number) => void
  editPercent: (percent: number) => void
  sendToManufacture: (invoiceId: string) => void

  invoice?: InvoiceType
  isPaymentError?: boolean
  isPriorityError?: boolean
  isShipmentError?: boolean
  isClosingDateError?: boolean
  isPercentError?: boolean
}

export const InvoiceStatusesTab = (props: InvoiceStatusesTabProps) => {
  const {
    editPayment,
    editPriority,
    editShipment,
    editPercent,
    editClosingDate,
    sendToManufacture,
    invoice,
    isPaymentError,
    isPriorityError,
    isShipmentError,
    isClosingDateError,
    isPercentError,
  } = props

  const [shipmentDate, setShipmentDate] = useState<string | null>(null)
  const [closingDate, setClosingDate] = useState<string | null>(null)

  const [isSendingToManufacture, setIsSendingToManufacture] = useState(false)

  const [percentValue, setPercentValue] = useState<number>(
    invoice?.paymentPercentage || 0,
  )

  const onShipment = () => {
    if (shipmentDate) editShipment(shipmentDate)
  }

  const onEditClosingDate = () => {
    if (closingDate) editClosingDate(closingDate)
  }

  useEffect(() => {
    if (invoice && !shipmentDate) setShipmentDate(invoice.dateShipment)
    if (invoice?.paymentPercentage !== percentValue)
      setPercentValue(invoice?.paymentPercentage || 0)
  }, [invoice])

  return (
    <>
      <section
        style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
      >
        <Text size="lg" weight="semi">
          Статус оплаты
        </Text>
        <Select
          value={invoice?.paymentStatus.value}
          onChange={(e) => editPayment(Number(e.target.value))}
        >
          <MenuItem value={100}>Не оплачено</MenuItem>
          <MenuItem value={200}>Аванс</MenuItem>
          <MenuItem value={300}>Полная оплата</MenuItem>
        </Select>

        {isPaymentError && <Text color="error">Ошибка изменения статуса оплаты</Text>}
      </section>

      {invoice?.paymentStatus.value === 200 && (
        <section
          style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
        >
          <Text size="lg" weight="semi">
            Процент выплат
          </Text>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
            <Slider
              aria-label="Volume"
              value={percentValue}
              onChange={(_, v) => setPercentValue(typeof v === 'number' ? v : v[0])}
            />

            <Text weight="semi" style={{ minWidth: 64 }} pos="right">
              {percentValue}%
            </Text>

            <Button
              style={{ padding: '10px 2px' }}
              mode="secondary"
              onClick={() => editPercent(percentValue)}
            >
              <DoneIcon />
            </Button>
          </div>

          {isPercentError && <Text color="error">Ошибка изменения даты отгрузки</Text>}
        </section>
      )}

      <section
        style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
      >
        <Text size="lg" weight="semi">
          Приоритет счёта
        </Text>
        <Select
          value={invoice?.priority.value}
          onChange={(e) => editPriority(Number(e.target.value))}
        >
          <MenuItem value={100}>Низкий</MenuItem>
          <MenuItem value={200}>Средний</MenuItem>
          <MenuItem value={300}>Высокий</MenuItem>
        </Select>

        {isPriorityError && <Text color="error">Ошибка изменения приоритета</Text>}
      </section>

      <section
        style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <Text size="lg" weight="semi">
            Дата совершенной отгрузки
          </Text>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
            <DateTimePicker
              onChange={(v) => setShipmentDate(dayjs(v).toISOString())}
              defaultValue={dayjs()}
              value={dayjs(shipmentDate || undefined)}
              className={cls.invoice_detailed__datetime}
            />
            <Button style={{ padding: '10px 2px' }} mode="secondary" onClick={onShipment}>
              <DoneIcon />
            </Button>
          </div>

          <Text size="sm" style={{ padding: '0 4px' }}>
            Дата отгрузки выставляется по факту совершенной отгрузки
          </Text>

          {isShipmentError && (
            <Text color="error" weight="semi" size="sm">
              Ошибка изменения даты отгрузки
            </Text>
          )}
        </LocalizationProvider>
      </section>

      <section
        style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <Text size="lg" weight="semi">
            Дата закрытия счёта
          </Text>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
            <DateTimePicker
              onChange={(v) => setClosingDate(dayjs(v).toISOString())}
              defaultValue={dayjs()}
              value={dayjs(closingDate || undefined)}
              className={cls.invoice_detailed__datetime}
            />
            <Button
              style={{ padding: '10px 2px' }}
              mode="secondary"
              onClick={onEditClosingDate}
            >
              <DoneIcon />
            </Button>
          </div>

          <Text size="sm" style={{ padding: '0 4px' }}>
            Дата закрытия выставляется по факту закрытого счёта
          </Text>

          {isClosingDateError && (
            <Text color="error" weight="semi" size="sm">
              Ошибка изменения даты закрытия счёта
            </Text>
          )}
        </LocalizationProvider>
      </section>

      <section>
        {invoice?.isManufacturingOrderSent && (
          <Text color="error" weight="semi">
            Счёт отправлен в производство
          </Text>
        )}

        {!invoice?.isManufacturingOrderSent && !isSendingToManufacture && (
          <Button full onClick={() => setIsSendingToManufacture(true)}>
            Передать в производство
          </Button>
        )}

        {!invoice?.isManufacturingOrderSent && isSendingToManufacture && (
          <>
            <Text style={{ padding: '8px 0' }}>
              Вы уверены, что хотите передать счёт в производство?
            </Text>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button full onClick={() => sendToManufacture(invoice?.id || '')}>
                Подтвердить
              </Button>
              <Button
                mode="neutral"
                full
                onClick={() => setIsSendingToManufacture(false)}
              >
                Отменить
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  )
}
