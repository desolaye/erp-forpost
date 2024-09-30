import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Table } from '@/shared/ui/table'

import { InvoiceCreator, useInvoicesPage } from '@/features/invoices'

import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { TableHead } from './components/table-head'
import { TableBody } from './components/table-body'

const InvoicesPage = () => {
  const { handlers, values } = useInvoicesPage()

  return (
    <PageWrapper title="Счета">
      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        <Button onClick={() => handlers.setIsModalOpen(true)}>Создать новый счёт</Button>
      </Card>

      <Table
        body={<TableBody data={values.invoices?.invoices} />}
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
    </PageWrapper>
  )
}

export default InvoicesPage
