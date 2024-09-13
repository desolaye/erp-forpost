import { Text } from '@/shared/ui/text'
import { useStepsTable } from '../../../lib/use-steps-table'

export const StepsTableHead = () => {
  const { getDisplayValues } = useStepsTable()

  return getDisplayValues().map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }}>
      {value.title}
    </Text>
  ))
}
