import { Table } from '@/shared/ui/table'
import { Text } from '@/shared/ui/text'

import { useIssuesPage } from '@/features/manufacture/issues'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { IssuesTableHead } from './components/issues-table-head'
import { IssuesTableBody } from './components/issues-table-body'

export const ManufactureIssues = () => {
  const { handlers, values } = useIssuesPage()

  return (
    <PageWrapper title="Производственные задачи">
      <Text size="lg">Продукт: {values.productName}</Text>
      <Text size="lg">Номер партии: {values.batchNumber}</Text>

      <Table
        body={<IssuesTableBody data={values.issues} />}
        header={<IssuesTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />
    </PageWrapper>
  )
}
