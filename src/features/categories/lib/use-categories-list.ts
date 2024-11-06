import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { CategoryType, getCategoriesAll, guidEmpty } from '@/entities/categories'

export const useCategoriesList = () => {
  const [route, setRoute] = useState<CategoryType>()
  const [routeHistory, setRouteHistory] = useState<CategoryType[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const { data, isLoading } = useQuery({
    queryFn: () => getCategoriesAll({ parentCategoryId: route ? route.id : undefined }),
    queryKey: ['categories_list', route?.id || guidEmpty],
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

  return {
    values: {
      route,
      routeHistory,
      categories: getRouteValues(),
      isLoading,
      isCreating,
    },
    handlers: {
      navigateTo,
      navigateToRoot,
      setIsCreating,
    },
  }
}
