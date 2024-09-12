import { useQuery } from '@tanstack/react-query'

import { getStaffManual } from '@/entities/manuals'
import { useState } from 'react'

export const useStaffPage = () => {
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 11

  const { data: staff, isPending } = useQuery({
    queryFn: () =>
      getStaffManual({
        params: { limit: ITEMS_PER_PAGE, skip: (page - 1) * ITEMS_PER_PAGE },
      }),
    queryKey: ['staff_all', page],
  })

  return {
    values: {
      data: staff?.data.employees,
      isPending,
      totalCount: Math.ceil((staff?.data.totalCount || 0) / ITEMS_PER_PAGE),
      page,
    },
    handlers: {
      setPage,
    },
  }
}
