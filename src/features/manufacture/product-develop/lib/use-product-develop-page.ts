import { useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getProductDevelopAll, getProductDevelopByIssueId } from '@/entities/manufacture'

export const useProductDevelopPage = () => {
  const { issueId } = useParams({ strict: false }) as { issueId?: string }

  const { page, setPage, getTotalCount, params } = usePagination(11)

  const { data, isPending } = useQuery({
    queryFn: () =>
      issueId
        ? getProductDevelopByIssueId(issueId, { params })
        : getProductDevelopAll({ params }),
    queryKey: ['product_develop_all', issueId],
  })

  return {
    values: {
      products: data?.developments,
      totalCount: getTotalCount(data?.totalCount),
      page,
      isPending,
    },
    handlers: {
      setPage,
    },
  }
}
