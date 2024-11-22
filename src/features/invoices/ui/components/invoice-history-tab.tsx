import { Text } from '@/shared/ui/text'

import { InvoiceHistoryResponseType } from '@/entities/invoices'
import { paymentStatusToText } from '@/entities/invoices/utils/payment-status-to-text'

type InvoiceHistoryTabProps = {
  history?: InvoiceHistoryResponseType['items']
}

const getHistoryString = (line: InvoiceHistoryResponseType['items'][0]) => {
  if (line.propertyName === 'PaymentStatus') {
    return (
      <>
        <Text>
          Изменен статус оплаты с{' '}
          <Text tag="span" weight="semi">
            {paymentStatusToText(line.oldValue)}
          </Text>{' '}
          на{' '}
          <Text tag="span" weight="semi">
            {paymentStatusToText(line.newValue)}
          </Text>{' '}
        </Text>

        <Text pos={'right'} style={{ padding: 2 }}>
          {line.createdAt}
        </Text>
      </>
    )
  }

  if (line.propertyName === 'PaymentPercentage') {
    return (
      <>
        <Text>
          Изменен процент оплаты с{' '}
          <Text tag="span" weight="semi">
            {line.oldValue}%
          </Text>{' '}
          на{' '}
          <Text tag="span" weight="semi">
            {line.newValue}%
          </Text>
        </Text>
        <Text pos="right" style={{ padding: 2 }}>
          {line.createdAt}
        </Text>
      </>
    )
  }
}

export const InvoiceHistoryTab = ({ history }: InvoiceHistoryTabProps) => {
  return (
    <section>
      {history?.map((v) => (
        <div
          key={v.id + v.createdAt}
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
