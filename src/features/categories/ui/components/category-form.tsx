import Textarea from '@mui/joy/Textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

import { JoyUiProvider } from '@/shared/lib/joy-ui-provider'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

import {
  CategoryToBackType,
  CategoryType,
  guidEmpty,
  postCreateCategory,
  putEditCategory,
} from '@/entities/categories'

type CategoryFormProps = {
  category?: CategoryType
  onClose?: () => void
}

export const CategoryForm = (props: CategoryFormProps) => {
  const { category, onClose } = props

  const queryClient = useQueryClient()

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['categories_list'] })
    queryClient.invalidateQueries({ queryKey: ['products_all'] })
    onClose?.()
  }

  const createCategory = useMutation({
    mutationFn: postCreateCategory,
    onSuccess,
  })

  const editCategory = useMutation({
    mutationFn: putEditCategory,
    onSuccess,
  })

  const isError = createCategory.isError || editCategory.isError
  const isPending = createCategory.isPending || editCategory.isPending

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryToBackType>({
    defaultValues: category,
  })

  const onSubmit: SubmitHandler<CategoryToBackType> = (e) => {
    if (category) {
      return category.id === guidEmpty
        ? createCategory.mutateAsync(e)
        : editCategory.mutateAsync(e)
    }
  }

  return (
    <Form
      withButtons
      onSubmit={handleSubmit(onSubmit)}
      onReset={onClose}
      pending={isPending}
    >
      <Text size="lg" weight="semi">
        Создание новой категории
      </Text>
      <Input
        {...register('name')}
        helper={errors.name?.message}
        label="Название категории"
        placeholder="Название категории"
        full
      />
      <JoyUiProvider>
        <Textarea
          {...register('description')}
          placeholder="Описание категории"
          minRows={4}
          variant="soft"
        />
      </JoyUiProvider>

      {isError && (
        <Text color="error">
          Ошибка обработки формы. Убедитесь, что данные введены правильно
        </Text>
      )}
    </Form>
  )
}
