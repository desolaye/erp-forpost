import { publicApi } from '@/shared/api/public-api.config'

export const putAssignExecutor = async (issueId: string, executorId: string) => {
  const response = await publicApi.put(`v1/issues/${issueId}/assign-executor`, null, {
    params: { executorId },
  })

  return response
}
