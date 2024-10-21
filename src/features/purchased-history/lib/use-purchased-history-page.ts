import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { usePagination } from '@/shared/lib/use-pagination'
import { getPurchaseHistoryAll } from '@/entities/purchase-history'

export const usePurchaseHistoryPage = () => {
  const [tab, setTab] = useState<boolean | number>(0)

  const [days, setDays] = useState<string>()
  const [month, setMonth] = useState<string>()
  const [year, setYear] = useState<string>()

  const { getTotalCount, page, params, setPage } = usePagination(10)

  const { data: purchases, isPending } = useQuery({
    queryFn: () =>
      getPurchaseHistoryAll({
        limit: params.limit,
        skip: params.skip,
        days,
        month,
        purchased: tab,
        year,
      }),
    queryKey: ['purchases_all', tab, page, days, month, year],
  })

  return {
    values: {
      purchases: purchases?.entries,
      tab,
      page,
      isPending,
      totalCount: getTotalCount(purchases?.totalCount),
    },
    handlers: {
      setTab,
      setDays,
      setMonth,
      setYear,
      setPage,
    },
  }
}
