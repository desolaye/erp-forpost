import { useQuery } from '@tanstack/react-query'

import { getTechcardFull } from '@/entities/manuals'
import { useState } from 'react'

export const useSingleTechcard = (id: string) => {
  const [tab, setTab] = useState(0)

  const { data: techcard, isPending } = useQuery({
    queryFn: () => getTechcardFull(id),
    queryKey: ['techcard_full', id],
  })

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    }
  }

  return {
    values: {
      data: techcard?.data,
      id,
      isPending,
      tab,
      a11y: new Array(3).map((_, i) => a11yProps(i)),
    },
    handlers: {
      setTab,
    },
  }
}
