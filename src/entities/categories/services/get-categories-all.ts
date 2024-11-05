import { publicApi } from '@/shared/api/public-api.config'
import { CategoryType } from '../model/category.schema'

type RequestProps = {
  name?: string
  categoryId?: string
  parentCategoryId?: string
}

export const getCategoriesAll = async (props: RequestProps) => {
  const { categoryId, name, parentCategoryId } = props

  const response = await publicApi.get<CategoryType[]>('/v1/categories', {
    params: {
      Name: name,
      CategoryId: categoryId,
      ParentCategoryId: parentCategoryId,
    },
  })

  return response.data
}
