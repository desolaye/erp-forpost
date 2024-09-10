import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { AgentValidatorType, postCreateAgent } from '@/entities/manuals'
import { getAgentByid } from '@/entities/manuals/services/get-agent-by-id'

interface IAgentEditorProps {
  id: string
  onClose?: () => void
}

export const useAgentEditor = (props: IAgentEditorProps) => {
  const { id, onClose } = props

  const queryClient = useQueryClient()

  const { data: agent, isLoading } = useQuery({
    queryFn: () => getAgentByid(id),
    queryKey: ['agent_by_id', id],
    enabled: id !== 'new',
  })

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: AgentValidatorType) => postCreateAgent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agent_by_id', id] })
      queryClient.invalidateQueries({ queryKey: ['agents_all'] })
      if (onClose) onClose()
    },
  })

  return {
    values: {
      agent,
      error,
      isPending,
      isLoading,
    },
    handlers: {
      onMutate: mutateAsync,
    },
  }
}
