import ReactSelect from 'react-select'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { agentsToOptions } from '@/entities/manuals'
import { getInvoiceStatusesOptions } from '@/entities/crm/invoices/utils/get-invoice-statuses-options'
import { getInvoicePriorityOptions } from '@/entities/crm/invoices/utils/get-invoice-priority-options'
import { getInvoicePaymentOptions } from '@/entities/crm/invoices/utils/get-invoice-payment-options'

import { InvoiceCreator, InvoiceDetailed, useInvoicesPage } from '@/features/crm/invoices'

import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { invoicesTableConfig } from '../utils/invoices-table.config'

const InvoicesPage = () => {
  const { handlers, values } = useInvoicesPage()
  const config = invoicesTableConfig()

  return (
    <PageWrapper title="Счета">
      <Card>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            mode="neutral"
            onClick={() => handlers.setIsFiltersOpen((prev) => !prev)}
            style={{ padding: '2px 8px' }}
          >
            <FilterAltIcon />
          </Button>
          <Input
            full
            placeholder="Поиск по номеру счёта"
            value={values.search}
            onChange={(e) => handlers.setSearch(e.target.value)}
          />
          <Button onClick={() => handlers.setIsModalOpen(true)}>
            Создать новый счёт
          </Button>
        </div>

        {values.isFiltersOpen && (
          <div style={{ zIndex: '10', display: 'flex', gap: 8 }}>
            <ReactSelect
              placeholder="Фильтр по контрагенту"
              options={agentsToOptions(values.contractors)}
              onInputChange={(val) => handlers.contractorSearch(val)}
              onChange={(v) => handlers.setContractorId(v?.value)}
              className="full"
              isClearable
            />
            <ReactSelect
              placeholder="Статус счёта"
              options={getInvoiceStatusesOptions()}
              onChange={(val) => handlers.setInvoiceStatus(val?.value)}
              className="full"
              isClearable
            />
            <ReactSelect
              placeholder="Приоритет счёта"
              options={getInvoicePriorityOptions()}
              onChange={(val) => handlers.setPriority(val?.value)}
              isClearable
              className="full"
            />
            <ReactSelect
              placeholder="Статус оплаты"
              options={getInvoicePaymentOptions()}
              onChange={(val) => handlers.setPaymentStatus(val?.value)}
              className="full"
              isClearable
            />
          </div>
        )}
      </Card>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.invoices?.map((row) => (
          <SmartTableRow
            key={row.id}
            config={config}
            // @ts-ignore
            row={row}
            onClick={() => handlers.setInvoiceId(row.id)}
          />
        ))}
      </SmartTable>

      <ModalLayout
        isOpen={values.isModalOpen}
        onClose={() => handlers.setIsModalOpen(false)}
      >
        <InvoiceCreator onClose={() => handlers.setIsModalOpen(false)} />
      </ModalLayout>

      <ModalLayout
        isOpen={Boolean(values.invoiceId)}
        onClose={() => handlers.setInvoiceId('')}
      >
        <InvoiceDetailed
          invoiceId={values.invoiceId}
          onClose={() => handlers.setInvoiceId('')}
        />
      </ModalLayout>
    </PageWrapper>
  )
}

export default InvoicesPage
