import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useFileLoader } from '@/shared/lib/use-file-loader'
import {
  deleteProductById,
  getProductById,
  postCreateProduct,
  ProductToBackType,
  putEditProduct,
} from '@/entities/manuals'

interface IProductEditorProps {
  id: string
  onClose?: () => void
}

export const useProductEditor = (props: IProductEditorProps) => {
  const { id, onClose } = props
  const [tab, setTab] = useState('data')

  const queryClient = useQueryClient()

  const { files, isPendingFile, mutateFile } = useFileLoader(id, 'files_all')

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['product_by_id', id] })
    queryClient.invalidateQueries({ queryKey: ['products_all'] })
    if (onClose) onClose()
  }

  const { data: product, isLoading } = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ['product_by_id', id],
    enabled: id !== 'new',
  })

  const {
    mutateAsync: mutateAsyncPost,
    isPending: isPendingPost,
    isError: errorPost,
  } = useMutation({
    mutationFn: postCreateProduct,
    onSuccess: handleSuccess,
  })

  const {
    mutateAsync: mutateAsyncPut,
    isPending: isPendingPut,
    isError: errorPut,
  } = useMutation({
    mutationFn: (data: ProductToBackType) =>
      putEditProduct({
        ...product!.data,
        ...data,
        categoryId: data.categoryId,
      }),
    onSuccess: handleSuccess,
  })

  const mutateDelete = useMutation({
    mutationFn: () => deleteProductById(id),
    onSuccess: handleSuccess,
  })

  const handleMutate = (data: ProductToBackType) => {
    if (id === 'new') return mutateAsyncPost(data)
    return mutateAsyncPut(data)
  }

  return {
    values: {
      product: product?.data,
      isError: errorPost || errorPut,
      isPending: isPendingPut || isPendingPost,
      isPendingFile,
      isLoading,
      tab,
      files,
    },
    handlers: {
      onMutate: handleMutate,
      onDelete: mutateDelete.mutateAsync,
      mutateFile,
      setTab,
    },
  }
}
