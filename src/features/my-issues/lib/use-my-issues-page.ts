import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { usePagination } from '@/shared/lib/use-pagination'

import { getMyIssues } from '@/entities/my-issues'
import { getStaffManual } from '@/entities/manuals'

export const useMyIssuesPage = () => {
  const [tab, setTab] = useState<'responsible' | 'executor'>('responsible')
  const { getTotalCount, page, params, setPage } = usePagination(11)

  const { data: issues, isPending: isPendingIssues } = useQuery({
    queryFn: () =>
      getMyIssues(tab, {
        params,
      }),
    queryKey: ['issues_all', tab, page],
  })

  const { data: staff, isPending: isPendingStaff } = useQuery({
    queryFn: () =>
      getStaffManual({
        params: { limit: 1000, skip: 0 },
      }),
    queryKey: ['staff_all'],
    enabled: tab === 'responsible',
  })

  return {
    values: {
      issues,
      tab,
      page,
      staff: staff?.data.employees,
      isPending: isPendingIssues || isPendingStaff,
      totalCount: getTotalCount(issues?.totalCount),
    },
    handlers: {
      setTab,
      setPage,
    },
  }
}