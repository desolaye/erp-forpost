import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { usePagination } from '@/shared/lib/use-pagination'
import { getTechcardsAll } from '@/entities/manuals/techcards'
import { useSearch } from '@/shared/lib/use-search'

export const useTechcardsPage = () => {
  const [selectedCard, setSelectedCard] = useState('')

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isOperationsOpen, setIsOperationsOpen] = useState(false)

  const { debouncedSearch, filters, search, setSearch } = useSearch('number')

  const { page, params, setPage, getTotalCount } = usePagination(20)

  const techcardsAll = useQuery({
    queryFn: () => getTechcardsAll({ ...params, number: filters?.filterValues }),
    queryKey: ['techcards_all', debouncedSearch, page],
    refetchOnWindowFocus: false,
  })

  return {
    values: {
      techcards: techcardsAll.data?.items,
      selectedCard,
      page,
      search,
      isLoadingAll: techcardsAll.isFetching,
      isCreateOpen,
      isOperationsOpen,
    },
    pagination: {
      page,
      count: getTotalCount(techcardsAll.data?.totalCount),
      onSetPage: setPage,
    },
    handlers: {
      onSelect: setSelectedCard,
      setIsCreateOpen,
      setIsOperationsOpen,
      setSearch,
    },
  }
}
