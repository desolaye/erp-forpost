import { routesPath } from '@/shared/config/routes-path.config'
import { TableRow } from '@/shared/ui/table-row'
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

  return data.map((v) => (
    <TableRow
      config={config}
      data={v}
      key={v.id}
      onCheck={() => onCheck?.(v.id)}
      to={routesPath.erp.manufacture.issues('/manufacture', v.id)}
    />
  ))
}
