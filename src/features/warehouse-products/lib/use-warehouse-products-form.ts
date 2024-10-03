import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  ProductByWarehouseValidatorType,
  ProductResponseType,
  productsToOptions,
  ZProductByWarehouseValidator,
} from '@/entities/manuals'

interface IUseWarehouseProductsForm {
  products?: ProductResponseType['products']
  onMutate: (product: ProductByWarehouseValidatorType) => void
}

export const useWarehouseProductsForm = (props: IUseWarehouseProductsForm) => {
  const { onMutate, products } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProductByWarehouseValidatorType>({
    resolver: zodResolver(ZProductByWarehouseValidator),
  })

  const onSubmit: SubmitHandler<ProductByWarehouseValidatorType> = onMutate

  return {
    values: {
      errors,
      control,
      products: productsToOptions(products),
    },
    handlers: {
      onSubmit,
      handleSubmit,
      register,
    },
  }
}
