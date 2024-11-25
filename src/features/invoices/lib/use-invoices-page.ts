import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'

import { getInvoicesAll } from '@/entities/invoices'
import { useSearch } from '@/shared/lib/use-search'
import { getAgentsManual } from '@/entities/manuals'

export const useInvoicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [invoiceId, setInvoiceId] = useState('')

  const { getTotalCount, page, params, setPage } = usePagination(50)
  const { filters, search, setSearch, debouncedSearch } = useSearch('number')
  const contractorFilter = useSearch('name')

  const [paymentStatus, setPaymentStatus] = useState<number>()
  const [priority, setPriority] = useState<number>()
  const [invoiceStatus, setInvoiceStatus] = useState<number>()
  const [contractorId, setContractorId] = useState<string>()

  const { data: invoices, isPending: isPendingInvoices } = useQuery({
    queryFn: () =>
      getInvoicesAll({
        ...params,
        number: filters?.filterValues,
        paymentStatus,
        invoiceStatus,
        priority,
        contractorId,
      }),
    queryKey: [
      'invoices_all',
      page,
      debouncedSearch,
      paymentStatus,
      priority,
      invoiceStatus,
      contractorId,
    ],
  })

  const { data: contractors } = useQuery({
    queryFn: () =>
      getAgentsManual({
        params: { limit: 20, skip: 0 },
        filters: contractorFilter?.filters,
      }),
    queryKey: ['contractors_all', debouncedSearch],
  })

  return {
    values: {
      invoices: invoices?.items,
      contractors: contractors?.data.contractors,
      page,
      invoiceId,
      isPending: isPendingInvoices,
      totalCount: getTotalCount(invoices?.totalCount),
      isModalOpen,
      isFiltersOpen,
      search,
      contractorId,
      paymentStatus,
    },
    handlers: {
      setPage,
      setIsModalOpen,
      setInvoiceId,
      setIsFiltersOpen,
      setSearch,
      contractorSearch: contractorFilter.setSearch,
      setPriority,
      setInvoiceStatus,
      setPaymentStatus,
      setContractorId,
    },
  }
}
