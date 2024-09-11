import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getTechcardsManual, TechcardType } from '@/entities/manuals'

export const useTechcardsPage = () => {
  const [id, setId] = useState('')

  const testCard: TechcardType = {
    number: 'ТК-001',
    description: null,
    id: '9f44a641-b377-48a1-9988-e3cfcc653968',
  }

  const { data: techcards, isPending } = useQuery({
    queryFn: getTechcardsManual,
    queryKey: ['techcards_all'],
  })

  const handleOpenCard = (cardId: string) => {
    setId(cardId)
  }

  return {
    values: {
      data: techcards?.data || [testCard],
      id,
      isPending,
    },
    handlers: {
      handleOpenCard,
    },
  }
}
