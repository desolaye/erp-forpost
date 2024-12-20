import { Select } from '@/shared/ui/select'

import { AgentResponseType, agentsToOptions } from '@/entities/manuals'
import { getInvoicePaymentOptions } from '@/entities/crm/invoices/utils/get-invoice-payment-options'
import { getInvoicePriorityOptions } from '@/entities/crm/invoices/utils/get-invoice-priority-options'
import { getInvoiceStatusesOptions } from '@/entities/crm/invoices/utils/get-invoice-statuses-options'

type InvoiceFilersProps = {
  contractors?: AgentResponseType['items']
  onContractorSearch: (val: string) => void
  onSelectContractor: (val?: string) => void
  onSelectInvoiceStatus: (val?: number) => void
  onSelectPriority: (val?: number) => void
  onSelectPaymentStatus: (val?: number) => void
}

export const InvoicesFilters = (props: InvoiceFilersProps) => {
  const {
    onContractorSearch,
    onSelectContractor,
    onSelectInvoiceStatus,
    onSelectPaymentStatus,
    onSelectPriority,
    contractors,
  } = props

  return (
    <div style={{ zIndex: '10', display: 'flex', gap: 8 }}>
      <Select
        placeholder="Фильтр по контрагенту"
        options={agentsToOptions(contractors)}
        onSearch={onContractorSearch}
        onChange={(v) => onSelectContractor(v !== null ? v.value : undefined)}
        className="full"
        isClearable
      />

      <Select
        placeholder="Статус счёта"
        options={getInvoiceStatusesOptions()}
        onChange={(v) => onSelectInvoiceStatus(v !== null ? v.value : undefined)}
        className="full"
        isClearable
      />

      <Select
        placeholder="Приоритет счёта"
        options={getInvoicePriorityOptions()}
        onChange={(v) => onSelectPriority(v !== null ? v.value : undefined)}
        isClearable
        className="full"
      />

      <Select
        placeholder="Статус оплаты"
        options={getInvoicePaymentOptions()}
        onChange={(v) => onSelectPaymentStatus(v !== null ? v.value : undefined)}
        className="full"
        isClearable
      />
    </div>
  )
}
