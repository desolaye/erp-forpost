import { useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'

export const useSearch = (field: string) => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const filters = debouncedSearch
    ? { filterExpression: field, filterValues: debouncedSearch }
    : undefined

  return {
    filters,
    setSearch,
    search,
    debouncedSearch,
  }
}
