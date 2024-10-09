import { useState } from 'react'

export const useIdSelection = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const selectId = (id: string) => {
    const idx = selectedIds.findIndex((v) => v === id)

    setSelectedIds((prev) => (idx === -1 ? [...prev, id] : prev.filter((v) => v !== id)))
  }

  const selectAll = (ids: string[] | undefined, isAllChecked: boolean) => {
    if (!ids) return []

    ids.forEach((id) =>
      setSelectedIds((prev) => {
        const idx = prev.findIndex((v) => v === id)

        if (isAllChecked) return prev.filter((v) => v !== id)
        return idx === -1 ? [...prev, id] : prev
      }),
    )
  }

  return {
    selectedIds,
    selectId,
    selectAll,
  }
}
