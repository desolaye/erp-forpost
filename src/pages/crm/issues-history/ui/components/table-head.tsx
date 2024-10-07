import { Text } from '@/shared/ui/text'

import { issuesHistoryTableConfig } from '../../utils/issues-history-table.config'

export const TableHead = () => {
  const config = issuesHistoryTableConfig()

  return config.map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
      {value.title}
    </Text>
  ))
}
