import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { getTechcardsManual } from '@/entities/manuals'

export const useTechcardsPage = () => {
  const [id, setId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { getTotalCount, page, params, setPage } = usePagination(11)

  const { data: techcards, isPending } = useQuery({
    queryFn: () =>
      getTechcardsManual({
        params,
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
      count: getTotalCount(techcards?.data.totalCount),
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
