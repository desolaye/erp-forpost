import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'

import {
  ProductToBackType,
  ProductType,
  ProductValidatorType,
  ZProductToBack,
} from '@/entities/manuals'
import { getCategoriesAll, guidEmpty } from '@/entities/categories'

interface IUseProductForm {
  data?: ProductType
  onMutate: (data: ProductToBackType) => void
  onClose: () => void
}

const baseCategory = {
  label: 'Без категории',
  value: guidEmpty,
}

export const useProductForm = (props: IUseProductForm) => {
  const { data, onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<ProductValidatorType>({
    resolver: zodResolver(ZProductToBack),
    defaultValues: {
      name: data?.name || '',
      purchased: Boolean(data?.purchased),
      categoryId: data
        ? { label: data.categoryName, value: data.categoryId }
        : baseCategory,
    },
  })

  const setCategory = (cat?: { label: string; value: string }) => {
    setValue('categoryId', cat || baseCategory)
  }

  const categoryValue = watch('categoryId')

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryFn: () =>
      getCategoriesAll({
        parentCategoryId:
          categoryValue.value === guidEmpty ? undefined : categoryValue.value,
      }),
    queryKey: ['categories_list', categoryValue.value],
  })

  const onSubmit: SubmitHandler<ProductValidatorType> = (data) => {
    const categoryId = data?.categoryId?.value || (data.categoryId as unknown as string)
    onMutate({ ...data, categoryId })
  }

  const onReset = onClose

  return {
    values: {
      control,
      errors,
      categories:
        categoryValue.value === guidEmpty ? categories : categories?.at(0)?.children,
      categoryValue,
      isLoadingCategories,
    },
    handlers: {
      register,
      handleSubmit,
      setCategory,
      onSubmit,
      onReset,
    },
  }
}
