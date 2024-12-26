import { InvoiceFilters } from '../model/invoice-filters.schema'

type ActionNumberedType = {
  type: 'payment' | 'priority' | 'invoice'
  value: number
}

type ActionStringType = {
  type: 'contractor'
  value: string
}

export type ActionType = ActionNumberedType | ActionStringType

export const invoiceFiltersReducer = (
  filters: InvoiceFilters,
  action: ActionType,
): InvoiceFilters => {
  switch (action.type) {
    case 'payment':
      return { ...filters, paymentStatus: action.value }

    case 'priority':
      return { ...filters, priority: action.value }

    case 'invoice':
      return { ...filters, invoiceStatus: action.value }

    case 'contractor':
      return { ...filters, contractorId: action.value }

    default:
      return filters
  }
}
