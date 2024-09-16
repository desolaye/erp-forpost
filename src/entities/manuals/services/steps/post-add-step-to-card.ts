import { publicApi } from '@/shared/api/public-api.config'

interface PostStepToCard {
  techCardId: string
  stepId: string
  number: string
}

export const postAddStepToCard = async (step: PostStepToCard) => {
  const response = await publicApi.post<string>('v1/tech-card-step', {
    ...step,
  })

  return response
}
