import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getIssuesByManufacture, getProcessById } from '@/entities/manufacture'

export const useIssuesPage = (manufactureId: string) => {
  const { page, setPage } = usePagination(8)

  const { data: issues, isPending: isPendingIssues } = useQuery({
    queryFn: () => getIssuesByManufacture(manufactureId),
    queryKey: ['issues_all', manufactureId],
  })

  const { data: process, isPending: isPendingProcess } = useQuery({
    queryFn: () => getProcessById(manufactureId),
    queryKey: ['process_by_id', manufactureId],
  })

  return {
    values: {
      issues,
      batchNumber: process?.batchNumber,
      productName: process?.productName,
      totalCount: 1,
      page,
      isPending: isPendingIssues || isPendingProcess,
    },
    handlers: {
      setPage,
    },
  }
}
