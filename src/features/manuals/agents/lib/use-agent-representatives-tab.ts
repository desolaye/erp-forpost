import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  AgentRepresentativesType,
  AgentRepresentativesValidatorType,
  getAgentRepresentatives,
  postAddRepresentativesAgent,
  putEditRepresentativesAgent,
  deleteRepresentativesAgent,
} from '@/entities/manuals'

type AgentRepresentativesTabProps = {
  contractorId: string
}

export const useAgentRepresentativesTab = (props: AgentRepresentativesTabProps) => {
  const { contractorId } = props

  const [editEntity, setEditEntity] = useState<AgentRepresentativesValidatorType>()
  const [deleteEntity, setDeleteEntity] = useState<AgentRepresentativesType>()

  const queryClient = useQueryClient()

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['representatives', contractorId] })
    setEditEntity(undefined)
    setDeleteEntity(undefined)
  }

  const { data: representatives, isLoading: isLoadingRepresentatives } = useQuery({
    queryFn: () => getAgentRepresentatives(contractorId),
    queryKey: ['representatives', contractorId],
  })

  const mutatePost = useMutation({
    mutationFn: postAddRepresentativesAgent,
    onSuccess,
  })

  const mutatePut = useMutation({
    mutationFn: putEditRepresentativesAgent,
    onSuccess,
  })

  const mutateDelete = useMutation({
    mutationFn: deleteRepresentativesAgent,
    onSuccess,
  })

  const mutateRepresentatives = (data: AgentRepresentativesValidatorType) => {
    if (data.id === 'new') mutatePost.mutateAsync(data)
    else mutatePut.mutateAsync(data)
  }

  return {
    values: {
      representatives: representatives?.data,
      isError: mutatePost.isError || mutatePut.isError,
      isPending: mutatePost.isPending || mutatePut.isPending,
      isLoading: isLoadingRepresentatives,
      editEntity,
      deleteEntity,
    },
    handlers: {
      onMutate: mutateRepresentatives,
      onDelete: mutateDelete.mutateAsync,
      setEditEntity,
      setDeleteEntity,
    },
  }
}
