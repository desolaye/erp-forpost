import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useFileLoader } from '@/shared/lib/use-file-loader'
import {
  getProductById,
  postCreateProduct,
  ProductValidatorType,
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

  const handleMutate = (data: ProductValidatorType) => {
    if (id === 'new') return mutateAsyncPost(data)
    return mutateAsyncPut(data)
  }

  return {
    values: {
      product: product?.data,
      isError: Boolean(errorPost) || Boolean(errorPost),
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
