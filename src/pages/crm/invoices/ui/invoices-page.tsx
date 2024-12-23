import FilterAltIcon from '@mui/icons-material/FilterAlt'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { ModalLayout } from '@/shared/ui/modal-layout'

import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { InvoiceCreator, InvoiceDetailed, useInvoicesPage } from '@/features/crm/invoices'

import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { invoicesTableConfig } from '../utils/invoices-table.config'
import { InvoicesFilters } from './components/invoices-filters'

const InvoicesPage = () => {
  const { handlers, values } = useInvoicesPage()
  const { config, tagColors } = invoicesTableConfig()

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
          <InvoicesFilters
            contractors={values.contractors}
            onContractorSearch={handlers.contractorSearch}
            onSelectContractor={handlers.setContractorId}
            onSelectInvoiceStatus={handlers.setInvoiceStatus}
            onSelectPaymentStatus={handlers.setPaymentStatus}
            onSelectPriority={handlers.setPriority}
          />
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
            tagColors={tagColors}
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
