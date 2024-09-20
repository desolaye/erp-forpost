import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { EmptyCard } from '@/shared/ui/empty-card'

import { MyIssueResponseType } from '@/entities/my-issues'

import { myIssuesTableConfig } from '../../utils/my-issues-table.config'

interface ITableBodyProps {
  tab: 'executor' | 'responsible'
  data?: MyIssueResponseType['issues']
}

export const TableBody = (props: ITableBodyProps) => {
  const { data, tab } = props
  const config = myIssuesTableConfig(tab)

  if (!data || !data.length) return <EmptyCard />

  return (
    <>
      {data.map((issue) => (
        <Button
          key={issue.id}
          mode="table"
          style={{ display: 'flex', gap: 8, width: '100%' }}
        >
          {config.map(([key, value]) => (
            <Text key={key} style={{ width: value.size }} hideOverflow>
              {issue[key]}
            </Text>
          ))}
        </Button>
      ))}

      {tab === 'responsible' && (
        <Button mode="secondary" circle>
          <MoreVertOutlinedIcon />
        </Button>
      )}
    </>
  )
}
