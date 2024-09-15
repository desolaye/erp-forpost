import { useState } from 'react'
import { TechcardFullType } from '@/entities/manuals'

export const useItemsInfo = (items: TechcardFullType['items']) => {
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(1)

  const ITEMS_PER_PAGE = 8

  const totalCount = Math.ceil(items.length / ITEMS_PER_PAGE)

  return {
    values: {
      items: items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
      totalCount,
      page: page,
      isOpen,
    },
    handlers: {
      setIsOpen,
      setPage,
    },
  }
}
