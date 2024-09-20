import { Link } from '@tanstack/react-router'
import { Checkbox } from '@mui/material'

import { routesPath } from '@/shared/config/routes-path.config'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { EmptyCard } from '@/shared/ui/empty-card'

import { ProcessType } from '@/entities/manufacture'
import { processesTableConfig } from '../../utils/processes-table.config'

interface IProcessesTableBody {
  data?: ProcessType[]
  onCheck?: (id: string) => void
}

export const ProcessesTableBody = (props: IProcessesTableBody) => {
  const { data, onCheck } = props
  const config = processesTableConfig()

  if (!data || !data.length) return <EmptyCard />

  return data.map((process) => (
    <Link
      key={process.id}
      to={routesPath.erp.manufacture.issues('/manufacture', process.id)}
      style={{ display: 'flex', gap: 8, width: '100%' }}
    >
      <Button mode="table" style={{ display: 'flex', gap: 8, width: '100%' }}>
        {onCheck && (
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            onChange={() => onCheck(process.id)}
            style={{ padding: 0 }}
          />
        )}

        {config.map(([key, value]) => (
          <Text key={key} style={{ width: value.size }} hideOverflow>
            {process[key]}
          </Text>
        ))}
      </Button>
    </Link>
  ))
}
