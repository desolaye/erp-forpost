import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'

import {
  getPriceListAll,
  postCreatePriceList,
  PriceListType,
  PriceListValidatorType,
  ZPriceListToBack,
} from '@/entities/crm/price-list'

export const usePriceListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPriceList, setSelectedPriceList] = useState<PriceListType>()

  const { getTotalCount, page, params, setPage } = usePagination(9)
  const { filters, search, setSearch, debouncedSearch } = useSearch('')

  const queryClient = useQueryClient()

  const setModal = (edit?: PriceListType) => {
    setSelectedPriceList(edit)
    setIsModalOpen(Boolean(edit))
  }

  const { data, isPending } = useQuery({
    queryFn: () =>
      getPriceListAll({
        params,
        productName: filters?.filterValues,
      }),
    queryKey: ['price_list_all', page, debouncedSearch],
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: PriceListValidatorType) =>
      postCreatePriceList(ZPriceListToBack.parse(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price_list_all'] })
      setModal()
    },
  })

  return {
    values: {
      search,
      data: data?.priceLists,
      selectedPriceList,
      page,
      totalPages: getTotalCount(data?.totalCount),
      isPending,
      isModalOpen,
    },
    handlers: {
      setSearch,
      setIsModalOpen,
      setPage,
      setModal,
      mutateAsync,
    },
  }
}
