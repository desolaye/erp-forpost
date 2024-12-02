import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'

import { getStaffManual, StaffType } from '@/entities/manuals'
import { SessionContext } from '@/entities/session'

export const useStaffPage = () => {
  const [id, setId] = useState('')
  const [staffModal, setStaffModal] = useState<StaffType>()

  const { getTotalCount, page, params, setPage } = usePagination(50)
  const { filters, search, setSearch, debouncedSearch } = useSearch('lastName')

  const sessionContext = useContext(SessionContext)

  const { data: staff, isFetching } = useQuery({
    queryFn: () =>
      getStaffManual({
        limit: params.limit,
        lastName: filters?.filterValues,
        skip: params.skip,
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
      data: staff?.data?.employees,
      staffModal,
      isLoading: isFetching,
      totalCount: getTotalCount(staff?.data?.totalCount),
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
