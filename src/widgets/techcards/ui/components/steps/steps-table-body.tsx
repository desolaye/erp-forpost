import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { EmptyCard } from '@/shared/ui/empty-card'

import { TechcardStepType } from '@/entities/manuals'
import { getDisplayValuesSteps } from '../../../utils/get-display-values-steps'

interface IStaffTableBody {
  data?: TechcardStepType[]
}

export const StepsTableBody = (props: IStaffTableBody) => {
  const { data } = props

  if (!data || !data.length) return <EmptyCard />

  return data.map((step) => (
    <Button
      key={step.cost + step.operationName}
      mode="table"
      style={{ display: 'flex', gap: 8 }}
    >
      {getDisplayValuesSteps().map(([key, value]) => (
        <Text key={key} style={{ width: value.size, overflow: 'hidden' }}>
          {step[key]}
        </Text>
      ))}
    </Button>
  ))
}
