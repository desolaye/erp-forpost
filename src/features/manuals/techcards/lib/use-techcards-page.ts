import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'
import { deleteTechcardById, getTechcardsManual } from '@/entities/manuals'

export const useTechcardsPage = () => {
  const [id, setId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { getTotalCount, page, params, setPage } = usePagination(50)
  const { filters, search, setSearch, debouncedSearch } = useSearch('number')

  const queryClient = useQueryClient()

  const { data: techcards, isPending } = useQuery({
    queryFn: () =>
      getTechcardsManual({
        params,
        filters,
      }),
    queryKey: ['techcards_all', page, debouncedSearch],
  })

  const { mutateAsync: deleteTechcard, isPending: isPendingDelete } = useMutation({
    mutationFn: (id: string) => deleteTechcardById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techcards_all'] })
      queryClient.invalidateQueries({ queryKey: ['techcard_full', id] })
      setId('')
    },
  })

  const openCard = (cardId: string) => setId(cardId)
  const openModal = () => setIsModalOpen((prev) => !prev)

  return {
    values: {
      data: techcards?.data?.techCards,
      count: getTotalCount(techcards?.data?.totalCount),
      id,
      isPending: isPending || isPendingDelete,
      isModalOpen,
      page,
      search,
    },
    handlers: {
      deleteTechcard,
      openCard,
      openModal,
      setPage,
      setSearch,
    },
  }
}
