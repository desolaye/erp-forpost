import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  deleteTechcardById,
  getTechcardCompositionById,
} from '@/entities/manuals/techcards'

type SelectedTechcardProps = {
  cardId: string
  onDelete?: () => void
}

export const useSelectedTechcard = (props: SelectedTechcardProps) => {
  const { cardId, onDelete } = props

  const queryClient = useQueryClient()

  const [selectedTab, setSelectedTab] = useState('general')
  const [isDeleting, setIsDeleting] = useState(false)

  const { data, isFetching } = useQuery({
    queryFn: () => getTechcardCompositionById(cardId),
    queryKey: ['techcard_composition_by_id', cardId],
    refetchOnWindowFocus: false,
  })

  const mutateDelete = useMutation({
    mutationFn: () => deleteTechcardById(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techcards_all'] })
      queryClient.invalidateQueries({ queryKey: ['techcard_composition_by_id', cardId] })
      onDelete?.()
    },
  })

  return {
    values: {
      selectedTab,
      isDeleting,
      data,
      isFetching: isFetching || mutateDelete.isPending,
    },
    handlers: {
      setSelectedTab,
      setIsDeleting,
      deleteTechcard: mutateDelete.mutateAsync,
    },
  }
}
