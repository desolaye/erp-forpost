import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useIdSelection } from '@/shared/lib/use-id-selection'

import {
  getProcessesAll,
  putProcessComplete,
  putProcessLaunch,
} from '@/entities/manufacture'

export const useProcessesPage = () => {
  const { getTotalCount, page, params, setPage } = usePagination(8)
  const [id, setId] = useState('')
  const { selectId, selectedIds } = useIdSelection()

  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryFn: () =>
      getProcessesAll({
        params,
      }),
    queryKey: ['processes_all', page],
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
    },
    handlers: {
      openModal,
      setPage,
      selectId,
      launchAll,
      completeAll,
    },
  }
}
