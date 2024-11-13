import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { usePagination } from '@/shared/lib/use-pagination'

import { getStaffManual, StaffType } from '@/entities/manuals'
import { SessionContext } from '@/entities/session'
import { useSearch } from '@/shared/lib/use-search'

export const useStaffPage = () => {
  const [id, setId] = useState('')
  const [staffModal, setStaffModal] = useState<StaffType>()

  const { getTotalCount, page, params, setPage } = usePagination(11)
  const { filters, search, setSearch, debouncedSearch } = useSearch('lastName')

  const sessionContext = useContext(SessionContext)

  const { data: staff, isFetching } = useQuery({
    queryFn: () =>
      getStaffManual({
        params,
        filters,
      }),
    queryKey: ['staff_all', page, debouncedSearch],
    refetchOnWindowFocus: false,
  })

  const openModal = (edit?: StaffType) => {
    setId(edit?.id || '')
    setStaffModal(edit)
  }

  return {
    values: {
      data: staff?.data.employees,
      staffModal,
      isLoading: isFetching,
      totalCount: getTotalCount(staff?.data.totalCount),
      page,
      user: sessionContext.session,
      id,
      search,
    },
    handlers: {
      setPage,
      openModal,
      setSearch,
      setId,
      setStaffModal,
    },
  }
}
