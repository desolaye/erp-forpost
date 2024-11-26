import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'
import { getAgentsManual } from '@/entities/manuals'

export const useAgentsPage = () => {
  const [agentId, setAgentId] = useState<string>()

  const { getTotalCount, page, params, setPage } = usePagination(50)
  const { filters, search, setSearch, debouncedSearch } = useSearch('name')

  const { data: agents, isFetching } = useQuery({
    queryFn: () =>
      getAgentsManual({
        params,
        filters,
      }),
    queryKey: ['agents_all', page, debouncedSearch],
    refetchOnWindowFocus: false,
  })

  const openModal = (id?: string) => setAgentId(id)

  return {
    values: {
      agents: agents?.data.items,
      totalCount: getTotalCount(agents?.data.totalCount),
      page,
      agentId,
      isLoading: isFetching,
      search,
    },
    handlers: {
      openModal,
      setPage,
      setSearch,
      setAgentId,
    },
  }
}
