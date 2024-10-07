import { EmptyCard } from '@/shared/ui/empty-card'
import { TableRow } from '@/shared/ui/table-row'

import { IssueHistoryType } from '@/entities/crm/issues-history'
import { issuesHistoryTableConfig } from '../../utils/issues-history-table.config'

interface ITableBodyProps {
  data?: IssueHistoryType[]
}

export const TableBody = (props: ITableBodyProps) => {
  const { data } = props
  const config = issuesHistoryTableConfig()

  if (!data || !data.length) return <EmptyCard />

  return data.map((v) => (
    <TableRow
      key={
        v.issueId +
        v.productDevelopmentId +
        v.responsibleId +
        v.executorId +
        v.completionDate
      }
      config={config}
      data={v}
    />
  ))
}
