import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { useFileLoader } from '@/shared/lib/use-file-loader'
import { ModalLayoutContext } from '@/shared/ui/modal-layout'

import {
  AgentValidatorType,
  postCreateAgent,
  getAgentByid,
  putEditAgent,
  deleteAgent,
} from '@/entities/manuals'

interface IAgentEditorProps {
  id?: string
}

export const useAgentEditor = (props: IAgentEditorProps) => {
  const { id = 'new' } = props
  const [tab, setTab] = useState('data')

  const { onClose } = useContext(ModalLayoutContext)
  const queryClient = useQueryClient()

  const {
    files,
    isPendingFile: isLoadingFile,
    mutateFile,
  } = useFileLoader(id, 'files_all')

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['agent_by_id', id] })
    queryClient.invalidateQueries({ queryKey: ['agents_all'] })
    if (onClose) onClose()
  }

  const { data: agent, isLoading: isLoadingAgent } = useQuery({
    queryFn: () => getAgentByid(id),
    queryKey: ['agent_by_id', id],
    enabled: id !== 'new',
  })

  const mutatePost = useMutation({
    mutationFn: (data: AgentValidatorType) => postCreateAgent(data),
    onSuccess,
  })

  const mutatePut = useMutation({
    mutationFn: (data: AgentValidatorType) => putEditAgent(data, id),
    onSuccess,
  })

  const mutateDelete = useMutation({
    mutationFn: () => deleteAgent(id),
    onSuccess,
  })

  const mutateAgent = (data: AgentValidatorType) => {
    if (id === 'new') mutatePost.mutateAsync(data)
    else mutatePut.mutateAsync(data)
  }

  return {
    values: {
      agent: agent?.data,
      tab,
      files,
      isError: mutatePost.isError || mutatePut.isError,
      isPending: mutatePost.isPending || mutatePut.isPending,
      isLoading: isLoadingAgent || isLoadingFile,
    },
    handlers: {
      onMutate: mutateAgent,
      onDelete: mutateDelete.mutateAsync,
      setTab,
      mutateFile,
    },
  }
}
