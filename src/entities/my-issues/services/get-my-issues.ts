import { GetWithParamsType } from '@/shared/model/get-with-params.type'
import { MyIssueResponseType, ZMyIssueResponse } from '../model/my-issues.schema'
import { publicApi } from '@/shared/api/public-api.config'

export const getMyIssues = async (
  assigner: 'executor' | 'responsible',
  params: GetWithParamsType,
) => {
  const response = await publicApi.get<MyIssueResponseType>(`v1/issues/for-${assigner}`, {
    params: { ...params.params },
  })

  const parsed = ZMyIssueResponse.parse(response.data)

  return parsed
}
