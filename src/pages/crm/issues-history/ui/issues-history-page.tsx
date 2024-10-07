import { Table } from '@/shared/ui/table'
import { IssuesHistoryFilters, useIssuesHistoryPage } from '@/features/crm/issues-history'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { TableBody } from './components/table-body'
import { TableHead } from './components/table-head'

const IssuesHistoryPage = () => {
  const { handlers, values } = useIssuesHistoryPage()

  return (
    <PageWrapper title="Отчёты по работе">
      <IssuesHistoryFilters
        onSetMonth={handlers.setMonth}
        onSetYear={handlers.setYear}
        onSetExecutor={handlers.setExecutorId}
        onSetResponsible={handlers.setResponsibleId}
      />
      <Table
        body={<TableBody data={values.issues} />}
        header={<TableHead />}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
        isPending={values.isPending}
      />
    </PageWrapper>
  )
}

export default IssuesHistoryPage
