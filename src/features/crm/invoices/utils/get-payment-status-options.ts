import { InvoiceValidatorType } from '@/entities/crm/invoices'

export const getPaymentStatusOptions = (): InvoiceValidatorType['paymentStatus'][] => {
  return [
    { label: 'Не оплачен', value: 100 },
    { label: 'Аванс', value: 200 },
    { label: 'Полная оплата', value: 300 },
  ]
}
