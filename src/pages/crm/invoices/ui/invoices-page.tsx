import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Table } from '@/shared/ui/table'

import { InvoiceCreator, InvoiceProducts, useInvoicesPage } from '@/features/invoices'

import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { TableHead } from './components/table-head'
import { TableBody } from './components/table-body'

const InvoicesPage = () => {
  const { handlers, values } = useInvoicesPage()

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

      <Table
        body={
          <TableBody data={values.invoices?.invoices} onClick={handlers.setInvoiceId} />
        }
        header={<TableHead />}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
        isPending={values.isPending}
      />

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
