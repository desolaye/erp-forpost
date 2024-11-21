import { MenuItem, Select } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import dayjs from 'dayjs'

import DoneIcon from '@mui/icons-material/Done'

import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { FileAdd } from '@/shared/ui/file'
import { Loader } from '@/shared/ui/loader'

import { ManualHeader } from '@/entities/manuals'
import { File } from '@/entities/files'

import { useInvoiceDetailed } from '../lib/use-invoice-detailed'
import { InvoiceProductsBody } from './components/invoice-products-body'

import cls from './invoice-detailed.module.scss'
import { Button } from '@/shared/ui/button'

interface IInvoiceDetailedProps {
  invoiceId: string
  onClose?: () => void
}

export const InvoiceDetailed = (props: IInvoiceDetailedProps) => {
  const { invoiceId } = props

  const { values, handlers } = useInvoiceDetailed(props)

  if (values.isLoading) return <Loader />

  return (
    <ModalEditor
      header={
        <ManualHeader
          id={invoiceId}
          onDelete={() => handlers.deleteInvoice()}
          setTab={handlers.setTab}
          tab={values.tab}
          tabs={[{ label: 'Управление', value: 'statuses' }]}
        />
      }
    >
      {values.tab === 'data' && (
        <InvoiceProductsBody data={values.products} invoice={values.invoice} />
      )}

      {values.tab === 'files' && (
        <>
          <FileAdd onLoad={handlers.mutateFile} />
          {values.files?.map((file) => (
            <File title={file.fileName} link={file.id} key={file.id} />
          ))}
        </>
      )}

      {values.tab === 'statuses' && (
        <>
          <section
            style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
          >
            <Text size="lg" weight="semi">
              Статус оплаты
            </Text>
            <Select
              value={values.invoice?.paymentStatus.value}
              onChange={(e) => handlers.editPayment(Number(e.target.value))}
            >
              <MenuItem value={100}>Не оплачено</MenuItem>
              <MenuItem value={200}>Аванс</MenuItem>
              <MenuItem value={300}>Полная оплата</MenuItem>
            </Select>
            {values.isPaymentError && (
              <Text color="error">Ошибка изменения статуса оплаты</Text>
            )}
          </section>

          <section
            style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
          >
            <Text size="lg" weight="semi">
              Приоритет счёта
            </Text>
            <Select
              value={values.invoice?.priority.value}
              onChange={(e) => handlers.editPriority(Number(e.target.value))}
            >
              <MenuItem value={100}>Низкий</MenuItem>
              <MenuItem value={200}>Средний</MenuItem>
              <MenuItem value={300}>Высокий</MenuItem>
            </Select>
            {values.isPriorityError && (
              <Text color="error">Ошибка изменения приоритета</Text>
            )}
          </section>

          <section
            style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
              <Text size="lg" weight="semi">
                Дата отгрузки
              </Text>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}
              >
                <DateTimePicker
                  onChange={(v) => handlers.setShipmentDate(dayjs(v).toISOString())}
                  defaultValue={dayjs()}
                  value={dayjs(values.shipmentDate || undefined)}
                  className={cls.invoice_detailed__datetime}
                />
                <Button
                  style={{ padding: '10px 2px' }}
                  mode="secondary"
                  onClick={() => handlers.editShipment()}
                >
                  <DoneIcon />
                </Button>
              </div>

              {values.isShipmentError && (
                <Text color="error">Ошибка изменения даты отгрузки</Text>
              )}
            </LocalizationProvider>
          </section>
        </>
      )}
    </ModalEditor>
  )
}
