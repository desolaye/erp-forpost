import { useQuery } from '@tanstack/react-query'
import { getAgentsManual } from '@/entities/manuals'
import { useState } from 'react'

export const useAgentsPage = () => {
  const [agentId, setAgentId] = useState('')

  const { data: agents, isPending } = useQuery({
    queryFn: getAgentsManual,
    queryKey: ['agents_all'],
  })

  const handleOpenModal = (id: string) => {
    setAgentId(id)
  }

  return {
    values: {
      agents: agents?.data,
      agentId,
      isPending,
    },
    handlers: {
      handleOpenModal,
    },
  }
}
