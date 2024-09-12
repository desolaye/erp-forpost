import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getAgentsManual } from '@/entities/manuals'

export const useAgentsPage = () => {
  const [page, setPage] = useState(1)
  const [agentId, setAgentId] = useState('')

  const ITEMS_PER_PAGE = 11

  const { data: agents, isPending } = useQuery({
    queryFn: () =>
      getAgentsManual({
        params: { limit: ITEMS_PER_PAGE, skip: (page - 1) * ITEMS_PER_PAGE },
      }),
    queryKey: ['agents_all', page],
  })

  const handleOpenModal = (id: string) => {
    setAgentId(id)
  }

  return {
    values: {
      agents: agents?.data,
      totalCount: Math.ceil((agents?.data.totalCount || 0) / ITEMS_PER_PAGE),
      page,
      agentId,
      isPending,
    },
    handlers: {
      handleOpenModal,
      setPage,
    },
  }
}
