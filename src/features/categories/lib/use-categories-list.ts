import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  CategoryType,
  deleteCategoryById,
  getCategoriesAll,
  guidEmpty,
} from '@/entities/categories'

export const useCategoriesList = () => {
  const [route, setRoute] = useState<CategoryType>()
  const [routeHistory, setRouteHistory] = useState<CategoryType[]>([])

  const [categoryToCreate, setCategoryToCreate] = useState<CategoryType>()
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType>()

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryFn: () => getCategoriesAll({ parentCategoryId: route ? route.id : undefined }),
    queryKey: ['categories_list', route?.id || guidEmpty],
  })

  const deleteCategory = useMutation({
    mutationFn: deleteCategoryById,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories_list'] }),
  })

  const navigateTo = (routeOpt: CategoryType) => {
    setRoute(routeOpt)

    setRouteHistory((prev) => {
      const idx = prev.findIndex((v) => v.id === routeOpt.id)
      if (idx === -1) return [...prev, routeOpt]
      return prev.slice(0, idx + 1)
    })
  }

  const navigateToRoot = () => {
    setRoute(undefined)
    setRouteHistory([])
  }

  const getRouteValues = () => {
    if (!route) return data
    return data ? data[0].children : []
  }

  const onDelete = () => {
    if (categoryToDelete) deleteCategory.mutateAsync(categoryToDelete.id)
    setCategoryToDelete(undefined)
  }

  return {
    values: {
      route,
      routeHistory,
      categories: getRouteValues(),
      isLoading: isLoading || deleteCategory.isPending,
      categoryToCreate,
      categoryToDelete,
    },
    handlers: {
      navigateTo,
      navigateToRoot,
      setCategoryToCreate,
      setCategoryToDelete,
      onDelete,
    },
  }
}
