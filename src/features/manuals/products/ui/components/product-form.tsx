import { Controller } from 'react-hook-form'
import { Checkbox, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { Input } from '@/shared/ui/input'
import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'
import { Loader } from '@/shared/ui/loader'

import { ProductToBackType, ProductType } from '@/entities/manuals'
import { guidEmpty } from '@/entities/categories'

import { useProductForm } from '../../lib/use-product-form'

interface IProductFormProps {
  data?: ProductType
  isPending?: boolean
  isError?: boolean

  onMutate: (data: ProductToBackType) => void
  onClose: () => void
}

export const ProductForm = (props: IProductFormProps) => {
  const { isPending, isError } = props
  const { values, handlers } = useProductForm(props)

  return (
    <Form
      onSubmit={handlers.handleSubmit(handlers.onSubmit)}
      onReset={handlers.onReset}
      withButtons
      pending={isPending}
      error={isError}
    >
      <Input
        placeholder="Название продукта"
        label="Название продукта"
        isError={Boolean(values.errors.name)}
        helper={values.errors.name?.message}
        {...handlers.register('name')}
      />
      <Controller
        name="purchased"
        control={values.control}
        render={({ field }) => (
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Checkbox {...field} checked={field.value} />
            <Text>Закупочный продукт</Text>
          </label>
        )}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text>Категория продукта</Text>
        {values.categoryValue.value !== guidEmpty && (
          <button
            type="button"
            onClick={() => handlers.setCategory()}
            style={{ textDecoration: 'underline' }}
          >
            Сбросить
          </button>
        )}
      </div>

      <Controller
        name="categoryId"
        control={values.control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>{field.value.label}</InputLabel>
            <Select
              {...field}
              onChange={() => {}}
              value={field.value.value === guidEmpty ? '' : field.value.value}
              label={field.value.label}
            >
              {values.isLoadingCategories && <Loader />}

              {!values.isLoadingCategories && !Boolean(values.categories?.length) && (
                <Text style={{ textAlign: 'center', padding: '8px' }}>
                  Дочерних категорий не обнаружено
                </Text>
              )}

              {!values.isLoadingCategories &&
                Boolean(values.categories?.length) &&
                values.categories?.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    value={cat.id}
                    onClick={() => {
                      handlers.setCategory({
                        label: cat.name,
                        value: cat.id,
                      })
                    }}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      />

      {values.errors.categoryId && (
        <Text color="error" size="sm">
          Неверная категория
        </Text>
      )}
    </Form>
  )
}
