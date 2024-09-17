import { useState } from 'react'

export const usePagination = (itemsPerPage: number) => {
  const [page, setPage] = useState(1)

  const getTotalCount = (count?: number) => {
    return Math.ceil((count || 1) / itemsPerPage)
  }

  return {
    page,
    params: { limit: itemsPerPage, skip: (page - 1) * itemsPerPage },
    setPage,
    getTotalCount,
  }
}
