import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useIdSelection } from '@/shared/lib/use-id-selection'
import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'

import {
  getProductDevelopAll,
  getProductDevelopByIssueId,
  putCompleteIssueByProductDevelop,
} from '@/entities/manufacture'

import { getMyIssueById } from '@/entities/my-issues'
import { useLocalSession } from '@/entities/session'

export const useProductDevelopPage = () => {
  const [searchBy, setSearchBy] = useState('productName')
  const { issueId } = useParams({ strict: false }) as { issueId?: string }
  const [productId, setProductId] = useState<string>()

  const { page, setPage, getTotalCount, params } = usePagination(issueId ? 7 : 9)
  const { selectId, selectAll, selectedIds } = useIdSelection()
  const { getLocalSession } = useLocalSession()
  const { filters, search, setSearch, debouncedSearch } = useSearch(searchBy)

  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryFn: () =>
      issueId
        ? getProductDevelopByIssueId(issueId, { params, filters })
        : getProductDevelopAll({ params, filters }),
    queryKey: ['product_develop_all', issueId, page, debouncedSearch, searchBy],
  })

  const { data: issue, isFetching: IsPendingIssue } = useQuery({
    queryFn: () => getMyIssueById(issueId),
    queryKey: ['issue_by_id', issueId],
    enabled: Boolean(issueId),
  })

  const { mutateAsync: mutateComplete, isPending: isCompletePending } = useMutation({
    mutationFn: () => putCompleteIssueByProductDevelop(selectedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product_develop_all'] })
    },
  })

  const title = !issueId
    ? 'Продукты в разработке'
    : `Продукт в разработке - ${issue?.productName}`

  const isSelectable = issueId && issue?.responsibleId === getLocalSession()?.id
  const isComposable = Boolean(issue?.productCompositionFlag)

  const isAllChecked = () => {
    return (
      data?.developments
        ?.map((v) => selectedIds.includes(v.id))
        .reduce((prev, curr) => prev && curr, true) || false
    )
  }

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
      isSelectable,
      isComposable,
      searchBy,
      search,
      productId,
      tableCheck: Boolean(issueId)
        ? {
            isAllChecked: isAllChecked(),
            onCheckAll: () =>
              selectAll(
                data?.developments.map((v) => v.id),
                isAllChecked(),
              ),
          }
        : undefined,
    },
    handlers: {
      setPage,
      setProductId,
      selectId,
      mutateComplete,
      setSearchBy,
      setSearch,
      isAllChecked,
    },
  }
}
