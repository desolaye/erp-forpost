import { Text } from '@/shared/ui/text'
import { getDisplayValuesSteps } from '../../../utils/get-display-values-steps'

export const StepsTableHead = () => {
  const displayValues = getDisplayValuesSteps()

  return displayValues.map(([key, value]) => (
    <Text key={key} weight="semi" style={{ width: value.size }}>
      {value.title}
    </Text>
  ))
}
