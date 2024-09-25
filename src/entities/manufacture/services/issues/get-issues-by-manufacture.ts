import { z } from 'zod'

import { publicApi } from '@/shared/api/public-api.config'
import { IssueInProcessType, ZIssueInProcess } from '../../model/issues.schema'

export const getIssuesByManufacture = async (id: string) => {
  const response = await publicApi.get<IssueInProcessType[]>(
    `v1/issues/manufactoring-process/${id}`,
  )

  const parsed = z.array(ZIssueInProcess).safeParse(response.data)

  return parsed.data
}
