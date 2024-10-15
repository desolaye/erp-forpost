import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getTechcardFull } from '@/entities/manuals'
import { useFileLoader } from '@/shared/lib/use-file-loader'

export const useSingleTechcard = (id: string) => {
  const [tab, setTab] = useState(0)

  const { files, mutateFile } = useFileLoader(id, 'techcard_files')

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
      files,
    },
    handlers: {
      setTab,
      mutateFile,
    },
  }
}
