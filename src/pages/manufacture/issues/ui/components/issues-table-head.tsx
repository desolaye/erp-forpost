import { Text } from '@/shared/ui/text'

import { issuesTableConfig } from '../../utils/issues-table.config'

export const IssuesTableHead = () => {
  const config = issuesTableConfig()

  return config.map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
      {value.title}
    </Text>
  ))
}
