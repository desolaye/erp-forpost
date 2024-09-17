import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getAgentsManual } from '@/entities/manuals'

export const useAgentsPage = () => {
  const [agentId, setAgentId] = useState('')
  const { getTotalCount, page, params, setPage } = usePagination(11)

  const { data: agents, isPending } = useQuery({
    queryFn: () =>
      getAgentsManual({
        params,
      }),
    queryKey: ['agents_all', page],
  })

  const openModal = (id?: string) => {
    setAgentId(id || '')
  }

  return {
    values: {
      agents: agents?.data,
      totalCount: getTotalCount(agents?.data.totalCount),
      page,
      agentId,
      isPending,
    },
    handlers: {
      openModal,
      setPage,
    },
  }
}
