import { useQuery } from '@tanstack/react-query'

import { Text } from '@/shared/ui/text'
import { Loader } from '@/shared/ui/loader'

import { getInvoiceHistoryById, InvoiceHistoryResponseType } from '@/entities/invoices'
import { paymentStatusToText } from '@/entities/invoices/utils/payment-status-to-text'
import { priorityStatusToText } from '@/entities/invoices/utils/priority-status-to-text'

type InvoiceHistoryTabProps = {
  invoiceId: string
}

const getHistoryString = (line: InvoiceHistoryResponseType['items'][0]) => {
  if (line.propertyName === 'PaymentStatus') {
    return (
      <>
        <Text>
          Изменен статус оплаты на{' '}
          <Text tag="span" weight="semi">
            {paymentStatusToText(line.value)}
          </Text>{' '}
          сотрудником {line.updatedByName}
        </Text>

        <Text pos={'right'} style={{ padding: 2 }}>
          {line.updatedAt}
        </Text>
      </>
    )
  }

  if (line.propertyName === 'PaymentPercentage') {
    return (
      <>
        <Text>
          Изменен процент оплаты на{' '}
          <Text tag="span" weight="semi">
            {line.value}%
          </Text>{' '}
          сотрудником {line.updatedByName}
        </Text>

        <Text pos="right" style={{ padding: 2 }}>
          {line.updatedAt}
        </Text>
      </>
    )
  }

  if (line.propertyName === 'Priority') {
    return (
      <>
        <Text>
          Изменен приоритет счёта на{' '}
          <Text tag="span" weight="semi">
            {priorityStatusToText(line.value)}
          </Text>{' '}
          сотрудником {line.updatedByName}
        </Text>

        <Text pos="right" style={{ padding: 2 }}>
          {line.updatedAt}
        </Text>
      </>
    )
  }

  return 'Неизвестное действие'
}

export const InvoiceHistoryTab = ({ invoiceId }: InvoiceHistoryTabProps) => {
  const { data: history, isLoading: isLoadingHistory } = useQuery({
    queryFn: () => getInvoiceHistoryById(invoiceId),
    queryKey: ['invoice_history_by_id', invoiceId],
  })

  if (isLoadingHistory) return <Loader />

  return (
    <section>
      {history?.map((v) => (
        <div
          key={v.id + v.updatedAt}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 8,
            alignItems: 'center',
            padding: 8,
            margin: '8px 0',
            border: '1px solid #7d0000',
            borderRadius: 8,
          }}
        >
          {getHistoryString(v)}
        </div>
      ))}
    </section>
  )
}
