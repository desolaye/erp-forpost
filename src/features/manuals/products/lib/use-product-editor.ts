import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
    mutationFn: (data: ProductValidatorType) => {
      return putEditProduct({ ...product!.data, ...data })
    },
    onSuccess: handleSuccess,
  })

  const handleMutate = (data: ProductValidatorType) => {
    id === 'new' ? mutateAsyncPost(data) : mutateAsyncPut(data)
  }

  return {
    values: {
      product: product?.data,
      errorPost,
      errorPut,
      isPending: isPendingPut || isPendingPost,
      isLoading,
    },
    handlers: {
      onMutate: handleMutate,
    },
  }
}
