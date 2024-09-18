import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import {
  putIssueClose,
  putIssueLaunch,
  getIssuesByManufacture,
} from '@/entities/manufacture'

export const useIssuesPage = (manufactureId: string) => {
  const { page, setPage } = usePagination(8)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryFn: () => getIssuesByManufacture(manufactureId),
    queryKey: ['issues_all', manufactureId],
  })

  const { mutateAsync: mutateLaunch, isPending: isLaunchPending } = useMutation({
    mutationFn: (id: string) => putIssueLaunch(id),
  })

  const { mutateAsync: mutateClose, isPending: isClosePending } = useMutation({
    mutationFn: (id: string) => putIssueClose(id),
  })

  const selectId = (id: string) => {
    const idx = selectedIds.findIndex((v) => v === id)

    setSelectedIds((prev) =>
      idx === -1 ? [...prev, id] : selectedIds.filter((v) => v !== id),
    )
  }

  const launchAll = () => {
    Promise.all(selectedIds.map((v) => mutateLaunch(v))).then(() => {
      queryClient.invalidateQueries({ queryKey: ['issues_all', manufactureId] })
    })
  }

  const closeAll = () => {
    Promise.all(selectedIds.map((v) => mutateClose(v))).then(() => {
      queryClient.invalidateQueries({ queryKey: ['issues_all', manufactureId] })
    })
  }

  return {
    values: {
      issues: data,
      totalCount: 1,
      page,
      selectedIds,
      isPending,
      isPendingAction: isLaunchPending || isClosePending,
    },
    handlers: {
      setPage,
      selectId,
      launchAll,
      closeAll,
    },
  }
}
