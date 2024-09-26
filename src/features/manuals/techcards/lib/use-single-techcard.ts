import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getTechcardFull } from '@/entities/manuals'

export const useSingleTechcard = (id: string) => {
  const [tab, setTab] = useState(0)

  const { data: techcard, isPending } = useQuery({
    queryFn: () => getTechcardFull(id),
    queryKey: ['techcard_full', id],
  })

  return {
    values: {
      data: techcard?.data,
      id,
      isPending,
      tab,
    },
    handlers: {
      setTab,
    },
  }
}
