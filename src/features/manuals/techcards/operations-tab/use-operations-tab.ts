import { useCallback, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  deleteOperationTechcard,
  postAddOperationToTechcard,
  putEditOperationTechcard,
  TechcardOperationType,
} from '@/entities/manuals/techcards'

import { getOperationsAll, operationsToOptions } from '@/entities/manuals/operations'

type OperationsTabProps = {
  cardId?: string
  operations?: TechcardOperationType[]
}

export const useOperationsTab = (props: OperationsTabProps) => {
  const { operations, cardId } = props

  const queryClient = useQueryClient()

  const [editItems, setEditItems] = useState(operations || [])

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['techcard_composition_by_id', cardId] })
  }, [cardId])

  const { data } = useQuery({
    queryFn: getOperationsAll,
    queryKey: ['operations_all'],
  })

  const mutateAdd = useMutation({
    mutationFn: (operationId: string) =>
      postAddOperationToTechcard({
        techCardId: cardId || '',
        operationId,
      }),
    onSuccess,
  })

  const mutateEdit = useMutation({
    mutationFn: (props: { number: number; operationId: string; id: string }) =>
      putEditOperationTechcard({
        techCardId: cardId || '',
        ...props,
      }),
    onSuccess,
  })

  const mutateDelete = useMutation({
    mutationFn: deleteOperationTechcard,
    onSuccess,
  })

  const onAdd = () => {
    setEditItems((prev) => [
      {
        id: `${new Date().toISOString()}`,
        techCardId: cardId || '',
        number: 0,
        operationId: '',
        operationName: 'Выберите операцию..',
        techCardNumber: '',
        description: '',
      },
      ...prev,
    ])
  }

  const onDelete = (id: string) => {
    setEditItems((prev) => prev.filter((v) => v.id !== id))
  }

  const onEditOperation = (id: string, op: { label: string; value: string }) => {
    setEditItems((prev) => {
      const idx = prev.findIndex((v) => v.id === id)
      if (idx === -1) return prev

      const newArray = [...prev]
      newArray[idx] = {
        ...newArray[idx],
        operationId: op.value,
        operationName: op.label,
        description: data?.find((v) => v.id === op.value)?.description || '',
      }
      return newArray
    })
  }

  const onMutate = () => {
    const toAdd = editItems.filter(
      (v) => operations?.findIndex((i) => i.id === v.id) === -1,
    )
    const toEdit = editItems.filter(
      (v) => operations?.findIndex((i) => i.id === v.id) !== -1,
    )
    const toDelete =
      operations?.filter((v) => editItems.findIndex((i) => i.id === v.id) === -1) || []

    toAdd.forEach(async (v) => await mutateAdd.mutateAsync(v.operationId))
    toEdit.forEach(async (v) => await mutateEdit.mutateAsync({ ...v }))
    toDelete.forEach(async (v) => await mutateDelete.mutateAsync(v.id))
  }

  return {
    values: {
      editItems,
      operations: operationsToOptions(data),
      isError: mutateAdd.isError || mutateEdit.isError || mutateDelete.isError,
      isPending: mutateAdd.isPending || mutateEdit.isPending || mutateDelete.isPending,
    },
    handlers: {
      setEditItems,
      onAdd,
      onDelete,
      onEditOperation,
      onMutate,
    },
  }
}
