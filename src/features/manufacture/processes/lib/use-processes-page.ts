import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useIdSelection } from '@/shared/lib/use-id-selection'
import { useSearch } from '@/shared/lib/use-search'

import {
  getProcessesAll,
  putProcessComplete,
  putProcessLaunch,
} from '@/entities/manufacture'

export const useProcessesPage = () => {
  const [id, setId] = useState('')

  const { getTotalCount, page, params, setPage } = usePagination(8)
  const { filters, search, setSearch, debouncedSearch } = useSearch('productName')
  const { selectId, selectedIds } = useIdSelection()

  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryFn: () =>
      getProcessesAll({
        params,
        filters,
      }),
    queryKey: ['processes_all', page, debouncedSearch],
  })

  const { mutateAsync: mutateLaunch, isPending: isLaunchPending } = useMutation({
    mutationFn: (id: string) => putProcessLaunch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processes_all'] })
    },
  })

  const { mutateAsync: mutateComplete, isPending: isCompletePending } = useMutation({
    mutationFn: (id: string) => putProcessComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processes_all'] })
    },
  })

  const openModal = (id?: string) => {
    setId(id || '')
  }

  const launchAll = () => {
    Promise.all(selectedIds.map((v) => mutateLaunch(v))).then(() => {
      queryClient.invalidateQueries({ queryKey: ['processes_all'] })
    })
  }

  const completeAll = () => {
    Promise.all(selectedIds.map((v) => mutateComplete(v))).then(() => {
      queryClient.invalidateQueries({ queryKey: ['processes_all'] })
    })
  }

  return {
    values: {
      processes: data,
      totalCount: getTotalCount(data?.totalCount),
      page,
      id,
      selectedIds,
      isPending,
      isPendingAction: isLaunchPending || isCompletePending,
      search,
    },
    handlers: {
      openModal,
      setPage,
      selectId,
      launchAll,
      completeAll,
      setSearch,
    },
  }
}
