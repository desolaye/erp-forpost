import { Checkbox } from '@mui/material'

import { EmptyCard } from '@/shared/ui/empty-card'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

import { IssueInProcessType } from '@/entities/manufacture'
import { issuesTableConfig } from '../../utils/issues-table.config'

interface IIssuesTableBodyProps {
  data?: IssueInProcessType[]
  onCheck?: (id: string) => void
}

export const IssuesTableBody = (props: IIssuesTableBodyProps) => {
  const { data, onCheck } = props
  const config = issuesTableConfig()

  if (!data || !data.length) return <EmptyCard />

  return data.map((issue) => (
    <Button
      key={issue.id}
      mode="table"
      style={{ display: 'flex', gap: 8, width: '100%' }}
    >
      {onCheck && (
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          onChange={() => onCheck(issue.id)}
          style={{ padding: 0 }}
        />
      )}

      {config.map(([key, value]) => (
        <Text key={key} style={{ width: value.size }} hideOverflow>
          {issue[key]}
        </Text>
      ))}
    </Button>
  ))
}
