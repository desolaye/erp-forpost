import { TechcardStepType } from '@/entities/manuals'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

import { useStepsTable } from '../../../lib/use-steps-table'

interface IStaffTableBody {
  data?: TechcardStepType[]
}

export const StepsTableBody = (props: IStaffTableBody) => {
  const { data } = props
  const { getDisplayValues } = useStepsTable()

  return data?.map((step) => (
    <Button key={step.operationName} mode="table" style={{ display: 'flex', gap: 8 }}>
      {getDisplayValues().map(([key, value]) => (
        <Text key={key} style={{ width: value.size, overflow: 'hidden' }}>
          {step[key]}
        </Text>
      ))}
    </Button>
  ))
}
