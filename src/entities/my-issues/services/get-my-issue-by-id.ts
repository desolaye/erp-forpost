import { publicApi } from '@/shared/api/public-api.config'

import { MyIssueType, ZMyIssue } from '../model/my-issues.schema'

export const getMyIssueById = async (id?: string) => {
  const response = await publicApi.get<MyIssueType>(`v1/issues/${id}`)
  const parsed = ZMyIssue.safeParse(response.data)
  if (parsed.error) console.log(parsed.error)

  return parsed.data
}
