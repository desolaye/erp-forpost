import { Text } from '@/shared/ui/text'

import { myIssuesTableConfig } from '../../utils/my-issues-table.config'

interface ITableHeadProps {
  tab: 'executor' | 'responsible'
}

export const TableHead = (props: ITableHeadProps) => {
  const { tab } = props
  const config = myIssuesTableConfig(tab)

  return (
    <>
      {config.map(([key, value]) => (
        <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
          {value.title}
        </Text>
      ))}

      {tab === 'responsible' && <div style={{ width: '28px' }} />}
    </>
  )
}
