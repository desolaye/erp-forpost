import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { Text } from '@/shared/ui/text'

import { useIssuesPage } from '@/features/manufacture/issues'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { issuesTableConfig } from '../utils/issues-table.config'

const ManufactureIssues = () => {
  const { handlers, values } = useIssuesPage()
  const config = issuesTableConfig()

  return (
    <PageWrapper title="Производственные задачи">
      <Text size="lg">Продукт: {values.productName}</Text>
      <Text size="lg">Номер партии: {values.batchNumber}</Text>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
        isLoading={values.isPending}
      >
        {values.issues?.map((v) => <SmartTableRow key={v.id} row={v} />)}
      </SmartTable>
    </PageWrapper>
  )
}

export default ManufactureIssues
