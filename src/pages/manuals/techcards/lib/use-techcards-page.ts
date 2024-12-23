import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { usePagination } from '@/shared/lib/use-pagination'
import { getTechcardsAll } from '@/entities/manuals/techcards'
import { useSearch } from '@/shared/lib/use-search'

export const useTechcardsPage = () => {
  const [selectedCard, setSelectedCard] = useState('')

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isStepsOpen, setIsStepsOpen] = useState(false)

  const { debouncedSearch, filters, search, setSearch } = useSearch('number')

  const { page, params, setPage, getTotalCount } = usePagination(20)

  const techcardsAll = useQuery({
    queryFn: () => getTechcardsAll({ ...params, number: filters?.filterValues }),
    queryKey: ['techcards_all', debouncedSearch],
    refetchOnWindowFocus: false,
  })

  return {
    values: {
      techcards: techcardsAll.data?.items,
      selectedCard,
      page,
      search,
      count: getTotalCount(techcardsAll.data?.totalCount),
      isLoadingAll: techcardsAll.isFetching,
      isCreateOpen,
      isStepsOpen,
    },
    handlers: {
      onSelect: setSelectedCard,
      onPageChange: setPage,
      setIsCreateOpen,
      setIsStepsOpen,
      setSearch,
    },
  }
}
