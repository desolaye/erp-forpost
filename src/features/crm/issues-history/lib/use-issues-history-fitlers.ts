import { useQuery } from '@tanstack/react-query'

import { usePagination } from '@/shared/lib/use-pagination'
import { useSearch } from '@/shared/lib/use-search'

import { getStaffManual, staffToOptions } from '@/entities/manuals'
import { IIssuesHistoryProps } from '../model/issues-history-props.interface'
import { selectConfig } from '../utils/select-config'

export const useIssuesHistoryFilters = (props: IIssuesHistoryProps) => {
  const { onSetExecutor, onSetMonth, onSetResponsible, onSetYear } = props
  const { params } = usePagination(8)

  const responsibleSearch = useSearch('lastName')
  const executorSearch = useSearch('lastName')

  const { data: executors } = useQuery({
    queryFn: () => getStaffManual({ params, filters: executorSearch.filters }),
    queryKey: ['executor_all', executorSearch.debouncedSearch],
  })

  const { data: responsible } = useQuery({
    queryFn: () => getStaffManual({ params, filters: responsibleSearch.filters }),
    queryKey: ['responsible_all', responsibleSearch.debouncedSearch],
  })

  const config = selectConfig({
    executors: {
      options: staffToOptions(executors?.data?.employees),
      onSearch: executorSearch.setSearch,
      onChange: (opt) => onSetExecutor(opt?.value),
    },
    responsible: {
      options: staffToOptions(responsible?.data?.employees),
      onSearch: responsibleSearch.setSearch,
      onChange: (opt) => onSetResponsible(opt?.value),
    },
    months: {
      onChange: (opt) => onSetMonth(opt?.value),
    },
    years: {
      onChange: (opt) => onSetYear(opt?.value),
    },
  })

  return config
}
