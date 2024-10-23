import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { useFileLoader } from '@/shared/lib/use-file-loader'
import { AgentValidatorType, postCreateAgent, getAgentByid } from '@/entities/manuals'

interface IAgentEditorProps {
  id?: string
  onClose?: () => void
}

export const useAgentEditor = (props: IAgentEditorProps) => {
  const { id, onClose } = props
  const [tab, setTab] = useState('data')
  const queryClient = useQueryClient()

  const { files, isPendingFile, mutateFile } = useFileLoader(id || '', 'files_all')

  const { data: agent, isLoading } = useQuery({
    queryFn: () => getAgentByid(id || ''),
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
      agent: agent?.data,
      tab,
      files,
      error,
      isPending,
      isPendingFile,
      isLoading,
    },
    handlers: {
      onMutate: mutateAsync,
      setTab,
      mutateFile,
    },
  }
}
