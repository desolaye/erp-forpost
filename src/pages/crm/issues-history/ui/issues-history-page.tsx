import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { IssuesHistoryFilters, useIssuesHistoryPage } from '@/features/crm/issues-history'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { issuesHistoryTableConfig } from '../utils/issues-history-table.config'

const IssuesHistoryPage = () => {
  const { handlers, values } = useIssuesHistoryPage()
  const config = issuesHistoryTableConfig()

  return (
    <PageWrapper title="Отчёты по работе">
      <IssuesHistoryFilters
        onSetMonth={handlers.setMonth}
        onSetYear={handlers.setYear}
        onSetExecutor={handlers.setExecutorId}
        onSetResponsible={handlers.setResponsibleId}
      />

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.issues?.map((row) => (
          <SmartTableRow
            key={row.issueId + row.responsibleId + row.completionDate}
            row={row}
          />
        ))}
      </SmartTable>
    </PageWrapper>
  )
}

export default IssuesHistoryPage
