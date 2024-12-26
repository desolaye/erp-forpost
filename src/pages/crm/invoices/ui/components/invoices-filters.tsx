import { Select } from '@/shared/ui/select'

import { AgentResponseType, agentsToOptions } from '@/entities/manuals'
import { getInvoicePaymentOptions } from '@/entities/crm/invoices/utils/get-invoice-payment-options'
import { getInvoicePriorityOptions } from '@/entities/crm/invoices/utils/get-invoice-priority-options'
import { getInvoiceStatusesOptions } from '@/entities/crm/invoices/utils/get-invoice-statuses-options'
import { ActionType } from '@/features/crm/invoices'

type InvoiceFilersProps = {
  contractors?: AgentResponseType['items']
  dispatch: (action: ActionType) => void
  onContractorSearch: (val: string) => void
}

export const InvoicesFilters = (props: InvoiceFilersProps) => {
  const { onContractorSearch, dispatch, contractors } = props

  return (
    <div style={{ zIndex: '10', display: 'flex', gap: 8 }}>
      <Select
        placeholder="Фильтр по контрагенту"
        options={agentsToOptions(contractors)}
        onSearch={onContractorSearch}
        onChange={(v) =>
          dispatch({ type: 'contractor', value: v !== null ? v.value : undefined })
        }
        className="full"
        isClearable
      />

      <Select
        placeholder="Статус счёта"
        options={getInvoiceStatusesOptions()}
        onChange={(v) =>
          dispatch({ type: 'invoice', value: v !== null ? v.value : undefined })
        }
        className="full"
        isClearable
      />

      <Select
        placeholder="Приоритет счёта"
        options={getInvoicePriorityOptions()}
        onChange={(v) =>
          dispatch({ type: 'priority', value: v !== null ? v.value : undefined })
        }
        isClearable
        className="full"
      />

      <Select
        placeholder="Статус оплаты"
        options={getInvoicePaymentOptions()}
        onChange={(v) =>
          dispatch({ type: 'payment', value: v !== null ? v.value : undefined })
        }
        className="full"
        isClearable
      />
    </div>
  )
}
