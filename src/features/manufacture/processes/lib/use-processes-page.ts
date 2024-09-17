import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getProcessesAll } from '@/entities/manufacture'

export const useProcessesPage = () => {
  const { getTotalCount, page, params, setPage } = usePagination(11)
  const [id, setId] = useState('')

  const { data, isPending } = useQuery({
    queryFn: () =>
      getProcessesAll({
        params,
      }),
    queryKey: ['processes_all', page],
  })

  const openModal = (id?: string) => {
    setId(id || '')
  }

  return {
    values: {
      processes: data,
      totalCount: getTotalCount(data?.totalCount),
      page,
      id,
      isPending,
    },
    handlers: {
      openModal,
      setPage,
    },
  }
}
