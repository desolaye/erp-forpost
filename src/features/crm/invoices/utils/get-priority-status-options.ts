import { InvoiceValidatorType } from '@/entities/crm/invoices'

export const getPriorityStatusOptions = (): InvoiceValidatorType['priority'][] => {
  return [
    { label: 'Низкий', value: 100 },
    { label: 'Средний', value: 200 },
    { label: 'Высокий', value: 300 },
  ]
}
