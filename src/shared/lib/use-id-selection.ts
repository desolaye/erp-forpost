import { useState } from 'react'

export const useIdSelection = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const selectId = (id: string) => {
    const idx = selectedIds.findIndex((v) => v === id)

    setSelectedIds((prev) =>
      idx === -1 ? [...prev, id] : selectedIds.filter((v) => v !== id),
    )
  }

  return {
    selectedIds,
    selectId,
  }
}
