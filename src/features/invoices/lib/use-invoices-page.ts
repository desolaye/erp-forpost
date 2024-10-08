import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'

import { getInvoicesAll } from '@/entities/invoices'
import { useSearch } from '@/shared/lib/use-search'

export const useInvoicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [invoiceId, setInvoiceId] = useState('')

  const { getTotalCount, page, params, setPage } = usePagination(11)
  const { filters, search, setSearch, debouncedSearch } = useSearch('number')

  const { data: invoices, isPending: isPendingInvoices } = useQuery({
    queryFn: () => getInvoicesAll({ params, filters }),
    queryKey: ['invoices_all', page, debouncedSearch],
  })

  return {
    values: {
      invoices: invoices?.invoices,
      page,
      invoiceId,
      isPending: isPendingInvoices,
      totalCount: getTotalCount(invoices?.totalCount),
      isModalOpen,
      search,
    },
    handlers: {
      setPage,
      setIsModalOpen,
      setInvoiceId,
      setSearch,
    },
  }
}
