import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getTechcardsManual } from '@/entities/manuals'

export const useTechcardsPage = () => {
  const [id, setId] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const ITEMS_PER_PAGE = 11

  const { data: techcards, isPending } = useQuery({
    queryFn: () =>
      getTechcardsManual({
        params: { limit: ITEMS_PER_PAGE, skip: (page - 1) * ITEMS_PER_PAGE },
      }),
    queryKey: ['techcards_all', page],
  })

  const openCard = (cardId: string) => {
    setId(cardId)
  }

  const openModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  return {
    values: {
      data: techcards?.data.techCards,
      count: Math.ceil((techcards?.data.totalCount || 1) / ITEMS_PER_PAGE),
      id,
      isPending,
      isModalOpen,
      page,
    },
    handlers: {
      openCard,
      openModal,
      setPage,
    },
  }
}
