import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getProductById,
  postCreateProduct,
  ProductValidatorType,
  putEditProduct,
} from '@/entities/manuals'
import { getFilesByParentId, postFilesLoad } from '@/entities/files'

interface IProductEditorProps {
  id: string
  onClose?: () => void
}

export const useProductEditor = (props: IProductEditorProps) => {
  const { id, onClose } = props
  const [tab, setTab] = useState('data')

  const queryClient = useQueryClient()

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

  const { data: files } = useQuery({
    queryFn: () => getFilesByParentId(id),
    queryKey: ['files_products_all', id],
    enabled: id !== 'new',
  })

  const {
    mutateAsync: mutateAsyncPost,
    isPending: isPendingPost,
    error: errorPost,
  } = useMutation({
    mutationFn: (data: ProductValidatorType) => postCreateProduct(data),
    onSuccess: handleSuccess,
  })

  const {
    mutateAsync: mutateAsyncPut,
    isPending: isPendingPut,
    error: errorPut,
  } = useMutation({
    mutationFn: (data: ProductValidatorType) =>
      putEditProduct({ ...product!.data, ...data }),
    onSuccess: handleSuccess,
  })

  const { mutateAsync: mutateFile, isPending: isPendingFile } = useMutation({
    mutationFn: (file: File) => postFilesLoad(file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['files_products_all'] }),
  })

  const handleMutate = (data: ProductValidatorType) => {
    if (id === 'new') return mutateAsyncPost(data)
    return mutateAsyncPut(data)
  }

  return {
    values: {
      product: product?.data,
      errorPost,
      errorPut,
      isPending: isPendingPut || isPendingPost,
      isPendingFile,
      isLoading,
      tab,
      files,
    },
    handlers: {
      onMutate: handleMutate,
      mutateFile,
      setTab,
    },
  }
}
