import { publicApi } from '@/shared/api/public-api.config'
import { IssueInProcessType, ZIssueInProcess } from '../../model/issues.schema'
import { z } from 'zod'

export const getIssuesByManufacture = async (id: string) => {
  const response = await publicApi.get<IssueInProcessType[]>(`v1/issues/${id}`)
  const parsed = z.array(ZIssueInProcess).safeParse(response.data)
  if (parsed.error) console.log('errors', parsed.error)

  return parsed.data
}
