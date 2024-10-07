import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getIssuesHistoryAll } from '@/entities/crm/issues-history'

export const useIssuesHistoryPage = () => {
  const [executorId, setExecutorId] = useState<string>()
  const [responsibleId, setResponsibleId] = useState<string>()
  const [month, setMonth] = useState<string>()
  const [year, setYear] = useState<string>()

  const { getTotalCount, page, params, setPage } = usePagination(9)

  const { data, isPending } = useQuery({
    queryFn: () =>
      getIssuesHistoryAll({
        ...params,
        executorId,
        responsibleId,
        month,
        year,
      }),
    queryKey: ['issues_history_all', page, executorId, responsibleId, month, year],
  })

  return {
    values: {
      issues: data?.issues,
      totalCount: getTotalCount(data?.totalCount),
      page,
      isPending,
    },
    handlers: {
      open,
      setPage,
      setExecutorId,
      setResponsibleId,
      setMonth,
      setYear,
    },
  }
}
