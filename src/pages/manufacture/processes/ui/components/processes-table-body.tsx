import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { EmptyCard } from '@/shared/ui/empty-card'

import { ProcessType } from '@/entities/manufacture'
import { processesTableConfig } from '../../utils/processes-table.config'

interface IStaffTableBody {
  data?: ProcessType[]
}

export const ProcessesTableBody = (props: IStaffTableBody) => {
  const { data } = props
  const config = processesTableConfig()

  if (!data || !data.length) return <EmptyCard />

  return data.map((process) => (
    <Button key={process.id} mode="table" style={{ display: 'flex', gap: 8 }}>
      {config.map(([key, value]) => (
        <Text key={key} style={{ width: value.size }} hideOverflow>
          {process[key]}
        </Text>
      ))}
    </Button>
  ))
}
