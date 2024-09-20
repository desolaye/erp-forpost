import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getIssuesByManufacture } from '@/entities/manufacture'

export const useIssuesPage = (manufactureId: string) => {
  const { page, setPage } = usePagination(8)

  const { data, isPending } = useQuery({
    queryFn: () => getIssuesByManufacture(manufactureId),
    queryKey: ['issues_all', manufactureId],
  })

  return {
    values: {
      issues: data,
      totalCount: 1,
      page,
      isPending,
    },
    handlers: {
      setPage,
    },
  }
}
