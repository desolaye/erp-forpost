import { useParams } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useIdSelection } from '@/shared/lib/use-id-selection'
import { usePagination } from '@/shared/lib/use-pagination'

import {
  getProductDevelopAll,
  getProductDevelopByIssueId,
  putCompleteIssueByProductDevelop,
} from '@/entities/manufacture'
import { getMyIssueById } from '@/entities/my-issues'

export const useProductDevelopPage = () => {
  const { issueId } = useParams({ strict: false }) as { issueId?: string }

  const { page, setPage, getTotalCount, params } = usePagination(8)
  const { selectId, selectedIds } = useIdSelection()
  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryFn: () =>
      issueId
        ? getProductDevelopByIssueId(issueId, { params })
        : getProductDevelopAll({ params }),
    queryKey: ['product_develop_all', issueId],
  })

  const { data: issue, isFetching: IsPendingIssue } = useQuery({
    queryFn: () => getMyIssueById(issueId),
    queryKey: ['issue_by_id', issueId],
    enabled: Boolean(issueId),
  })

  const { mutateAsync: mutateComplete, isPending: isCompletePending } = useMutation({
    mutationFn: (id: string) => putCompleteIssueByProductDevelop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product_develop_all'] })
    },
  })

  const completeAll = () => {
    Promise.all(selectedIds.map((v) => mutateComplete(v))).then(() => {
      queryClient.invalidateQueries({ queryKey: ['product_develop_all'] })
    })
  }

  const title = !issueId
    ? 'Продукты в разработке'
    : `Продукт в разработке - ${issue?.productName}`

  return {
    values: {
      products: data?.developments,
      totalCount: getTotalCount(data?.totalCount),
      page,
      isPending: isCompletePending || isPending || IsPendingIssue,
      issueId,
      issue,
      selectedIds,
      title,
    },
    handlers: {
      setPage,
      selectId,
      completeAll,
    },
  }
}
