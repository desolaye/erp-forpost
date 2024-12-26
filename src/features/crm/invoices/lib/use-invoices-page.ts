import { useReducer, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'

import { getAgentsManual } from '@/entities/manuals'
import { getInvoicesAll } from '@/entities/crm/invoices'

import { invoiceFiltersReducer } from '../utils/invoice-filters-reducer'

export const useInvoicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [invoiceId, setInvoiceId] = useState('')

  const { getTotalCount, page, params, setPage } = usePagination(50)
  const { filters, search, setSearch, debouncedSearch } = useSearch('number')
  const contractorFilter = useSearch('name')

  const [filter, dispatch] = useReducer(invoiceFiltersReducer, {})

  const { data: invoices, isFetching: isPendingInvoices } = useQuery({
    queryFn: () =>
      getInvoicesAll({
        ...params,
        ...filter,
        number: filters?.filterValues,
      }),
    queryKey: [
      'invoices_all',
      page,
      debouncedSearch,
      filter.contractorId,
      filter.paymentStatus,
      filter.priority,
      filter.invoiceStatus,
    ],
  })

  const { data: contractors } = useQuery({
    queryFn: () =>
      getAgentsManual({
        name: contractorFilter.filters?.filterValues,
        skip: 0,
        limit: 50,
      }),
    queryKey: ['contractors_all', contractorFilter.debouncedSearch],
  })

  return {
    values: {
      invoices: invoices?.items,
      contractors: contractors?.data?.items,
      page,
      invoiceId,
      isPending: isPendingInvoices,
      totalCount: getTotalCount(invoices?.totalCount),
      isModalOpen,
      isFiltersOpen,
      search,
    },
    handlers: {
      setPage,
      setIsModalOpen,
      setInvoiceId,
      setIsFiltersOpen,
      setSearch,
      contractorSearch: contractorFilter.setSearch,
      dispatch,
    },
  }
}
