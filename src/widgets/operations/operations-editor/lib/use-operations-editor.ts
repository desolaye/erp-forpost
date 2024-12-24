import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import {
  getOperationById,
  getOperationsAll,
  operationsTypeToText,
} from '@/entities/manuals/operations'

export const useOperationsEditor = () => {
  const [selectedOperation, setSelectedOperation] = useState('')

  const { data: operations, isFetching } = useQuery({
    queryFn: () => getOperationsAll(),
    queryKey: ['operations_all'],
  })

  const { data: operation, isFetching: isFetchingOper } = useQuery({
    queryFn: () => getOperationById(selectedOperation),
    queryKey: ['operation_by_id', selectedOperation],
    enabled: Boolean(selectedOperation) && selectedOperation !== 'new',
  })

  return {
    values: {
      selectedOperation,
      operation,
      isLoading: isFetching || isFetchingOper,
      operations: operations?.map((v) => ({
        ...v,
        type: operationsTypeToText(v.type.value),
      })),
    },
    handlers: {
      selectOperation: setSelectedOperation,
    },
  }
}
