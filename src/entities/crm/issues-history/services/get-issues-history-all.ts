import { publicApi } from '@/shared/api/public-api.config'
import {
  IssueHistoryResponseType,
  ZIssueHistoryResponse,
} from '../model/issues-history.model'

interface IGetIssuesHistoryParams {
  skip: number
  limit: number
  executorId?: string
  responsibleId?: string
  month?: string
  year?: string
}

export const getIssuesHistoryAll = async (props: IGetIssuesHistoryParams) => {
  const {
    limit: Limit,
    skip: Skip,
    executorId: ExecutorId,
    responsibleId: ResponsibleId,
    month: Month,
    year: Year,
  } = props

  const response = await publicApi.get<IssueHistoryResponseType>('v1/issue-history', {
    params: {
      Limit,
      Skip,
      ExecutorId,
      ResponsibleId,
      Month,
      Year,
    },
  })

  const parsed = ZIssueHistoryResponse.safeParse(response.data)
  if (parsed.error) console.error(parsed.error)

  return parsed.data
}
