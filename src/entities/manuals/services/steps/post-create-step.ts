import { publicApi } from '@/shared/api/public-api.config'
import { StepValidatorType } from '../../model/step.schema'

type StepPost = StepValidatorType & { techCardId: string }

export const postCreateStep = async (step: StepPost) => {
  const response = await publicApi.post<string>('v1/steps', {
    ...step,
    cost: Number(step.cost),
    unitOfMeasure: Number(step.unitOfMeasure),
  })

  return response
}
