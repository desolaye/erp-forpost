import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { getStaffManual } from '@/entities/manuals'
import { SessionContext } from '@/entities/session'

export const useStaffPage = () => {
  const [id, setId] = useState('')
  const [page, setPage] = useState(1)

  const sessionContext = useContext(SessionContext)
  const ITEMS_PER_PAGE = 11

  const { data: staff, isPending } = useQuery({
    queryFn: () =>
      getStaffManual({
        params: { limit: ITEMS_PER_PAGE, skip: (page - 1) * ITEMS_PER_PAGE },
      }),
    queryKey: ['staff_all', page],
  })

  const handleOpenModal = (editId: string) => {
    setId(editId)
  }

  return {
    values: {
      data: staff?.data.employees,
      isPending,
      totalCount: Math.ceil((staff?.data.totalCount || 0) / ITEMS_PER_PAGE),
      page,
      user: sessionContext.session,
      id,
    },
    handlers: {
      setPage,
      handleOpenModal,
    },
  }
}
