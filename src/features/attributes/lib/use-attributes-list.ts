import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  AttributeType,
  deleteAttributeById,
  getAttributesAll,
  postCreateAttribute,
  putEditAttribute,
} from '@/entities/attributes'

export const useAttributesList = () => {
  const [selectedAttr, setSelectedAttr] = useState<AttributeType>()
  const [isDeleting, setIsDeleting] = useState(false)

  const queryClient = useQueryClient()

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['attributes_all'] })
    setSelectedAttr(undefined)
    setIsDeleting(false)
  }

  const { data, isFetching } = useQuery({
    queryFn: () => getAttributesAll(),
    queryKey: ['attributes_all'],
    refetchOnWindowFocus: false,
  })

  const mutatePost = useMutation({
    mutationFn: postCreateAttribute,
    onSuccess,
  })

  const mutatePut = useMutation({
    mutationFn: putEditAttribute,
    onSuccess,
  })

  const mutateDelete = useMutation({
    mutationFn: deleteAttributeById,
    onSuccess,
  })

  const onMutate = () => {
    if (selectedAttr) {
      if (selectedAttr.id === 'new') mutatePost.mutateAsync(selectedAttr)
      else mutatePut.mutateAsync(selectedAttr)
    }
  }

  const onDelete = () => {
    if (selectedAttr) mutateDelete.mutateAsync(selectedAttr.id)
  }

  const addValue = () => {
    setSelectedAttr((prev) => {
      if (prev) return { ...prev, values: [...prev.values, ''] }
      return prev
    })
  }

  const editValue = (value: string, idx: number) => {
    setSelectedAttr((prev) => {
      if (prev) {
        const values = [...prev.values]
        values[idx] = value
        return { ...prev, values }
      }

      return prev
    })
  }

  const deleteValue = (idx: number) => {
    setSelectedAttr((prev) => {
      if (prev) return { ...prev, values: prev.values.filter((_, i) => i !== idx) }
      return prev
    })
  }

  return {
    values: {
      attributes: data,
      isLoading:
        isFetching ||
        mutatePost.isPending ||
        mutatePut.isPending ||
        mutateDelete.isPending,
      isDeleting,
      selectedAttr,
    },
    handlers: {
      setSelectedAttr,
      setIsDeleting,
      onMutate,
      onDelete,
      addValue,
      editValue,
      deleteValue,
    },
  }
}
