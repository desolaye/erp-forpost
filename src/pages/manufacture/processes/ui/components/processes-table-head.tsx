import { Text } from '@/shared/ui/text'
import { processesTableConfig } from '../../utils/processes-table.config'

export const ProcessesTableHead = () => {
  const config = processesTableConfig()

  return (
    <>
      <div style={{ width: '28px' }} />
      {config.map(([key, value]) => (
        <Text key={key} weight="semi" style={{ width: value.size }} hideOverflow>
          {value.title}
        </Text>
      ))}
    </>
  )
}