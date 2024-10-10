import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { InvoiceCreator, InvoiceProducts, useInvoicesPage } from '@/features/invoices'

import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { invoicesTableConfig } from '../utils/invoices-table.config'

const InvoicesPage = () => {
  const { handlers, values } = useInvoicesPage()
  const config = invoicesTableConfig()

  return (
    <PageWrapper title="Счета">
      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <Button onClick={() => handlers.setIsModalOpen(true)}>Создать новый счёт</Button>
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
        <InvoiceProducts invoiceId={values.invoiceId} />
      </ModalLayout>
    </PageWrapper>
  )
}

export default InvoicesPage
