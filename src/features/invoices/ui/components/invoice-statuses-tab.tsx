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
import { InvoiceType } from '@/entities/invoices'

import cls from '../invoice-detailed.module.scss'

type InvoiceStatusesTabProps = {
  editPayment: (status: number) => void
  editPriority: (status: number) => void
  editShipment: (shipment: string) => void
  editPercent: (percent: number) => void

  invoice?: InvoiceType
  isPaymentError?: boolean
  isPriorityError?: boolean
  isShipmentError?: boolean
  isPercentError?: boolean
}

export const InvoiceStatusesTab = (props: InvoiceStatusesTabProps) => {
  const {
    editPayment,
    editPriority,
    editShipment,
    editPercent,
    invoice,
    isPaymentError,
    isPriorityError,
    isShipmentError,
    isPercentError,
  } = props

  const [shipmentDate, setShipmentDate] = useState<string | null>(null)
  const [percentValue, setPercentValue] = useState<number>(
    invoice?.paymentPercentage || 0,
  )

  const onShipment = () => {
    if (shipmentDate) editShipment(shipmentDate)
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

            <Text weight="semi">{percentValue}%</Text>

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
            Дата отгрузки
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

          {isShipmentError && <Text color="error">Ошибка изменения даты отгрузки</Text>}
        </LocalizationProvider>
      </section>
    </>
  )
}
