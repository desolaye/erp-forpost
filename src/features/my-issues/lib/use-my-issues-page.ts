import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { usePagination } from '@/shared/lib/use-pagination'
import { getMyIssues } from '@/entities/my-issues'

export const useMyIssuesPage = () => {
  const [tab, setTab] = useState<'responsible' | 'executor'>('responsible')
  const { getTotalCount, page, params, setPage } = usePagination(11)

  const { data: issues, isPending } = useQuery({
    queryFn: () =>
      getMyIssues(tab, {
        params,
      }),
    queryKey: ['issues_all', tab, page],
  })

  return {
    values: {
      issues,
      tab,
      isPending,
      page,
      totalCount: getTotalCount(issues?.totalCount),
    },
    handlers: {
      setTab,
      setPage,
    },
  }
}
