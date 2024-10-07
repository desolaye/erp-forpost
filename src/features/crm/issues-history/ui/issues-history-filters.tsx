import ReactSelect from 'react-select'

import { Card } from '@/shared/ui/card'
import { useIssuesHistoryFilters } from '../lib/use-issues-history-fitlers'
import { IIssuesHistoryProps } from '../model/issues-history-props.interface'

export const IssuesHistoryFilters = (props: IIssuesHistoryProps) => {
  const config = useIssuesHistoryFilters(props)

  return (
    <Card style={{ flexDirection: 'row' }}>
      {config.map((v) => (
        <ReactSelect
          {...v}
          key={v.placeholder}
          isClearable
          styles={{
            container: (base) => ({
              ...base,
              width: v.width,
              minWidth: '225px',
            }),
          }}
        />
      ))}
    </Card>
  )
}
