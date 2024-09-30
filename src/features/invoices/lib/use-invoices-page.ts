import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'

import { getInvoicesAll } from '@/entities/invoices'

export const useInvoicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { getTotalCount, page, params, setPage } = usePagination(11)

  const { data: invoices, isPending: isPendingInvoices } = useQuery({
    queryFn: () => getInvoicesAll({ params }),
    queryKey: ['invoices_all', page],
  })

  return {
    values: {
      invoices,
      page,
      isPending: isPendingInvoices,
      totalCount: getTotalCount(invoices?.totalCount),
      isModalOpen,
    },
    handlers: {
      setPage,
      setIsModalOpen,
    },
  }
}
