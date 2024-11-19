import { MouseEvent, useEffect, useState } from 'react'
import { Breadcrumbs, Menu, MenuItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import { Loader } from '@/shared/ui/loader'
import { Text } from '@/shared/ui/text'

import { CategoryType, getCategoriesAll, guidEmpty } from '@/entities/categories'

import cls from '../categories-list.module.scss'

type CategoriesCrumbsProps = {
  onSetCategory: (categoryId: string) => void
}

export const CategoriesCrumbs = (props: CategoriesCrumbsProps) => {
  const { onSetCategory } = props

  const [routeHistory, setRouteHistory] = useState<CategoryType[]>([])

  const { data, isLoading } = useQuery({
    queryFn: () => getCategoriesAll({}),
    queryKey: ['categories_list'],
  })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openedCategory, setOpenedCategory] = useState<CategoryType & { idx: number }>()

  const open = Boolean(anchorEl && openedCategory)

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    category: CategoryType,
    idx: number,
  ) => {
    setAnchorEl(e.currentTarget)
    setOpenedCategory({ ...category, idx })
  }

  const handleSelect = (category: CategoryType) => {
    handleClose()
    onSetCategory(category.id)

    if (openedCategory) {
      if (openedCategory.idx < routeHistory.length - 1) {
        setRouteHistory((prev) => prev.filter((_, i) => i <= openedCategory.idx))
        if (category.id !== guidEmpty) setRouteHistory((prev) => [...prev, category])
      } else {
        if (category.id !== guidEmpty) setRouteHistory((prev) => [...prev, category])
      }
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenedCategory(undefined)
  }

  useEffect(() => {
    if (data && !routeHistory.length) {
      setRouteHistory([
        {
          name: 'Основные',
          children: [
            {
              children: [],
              description: '',
              id: guidEmpty,
              name: 'Все товары',
              parentCategoryId: guidEmpty,
            },
            ...data,
          ],
          description: '',
          id: guidEmpty,
          parentCategoryId: guidEmpty,
        },
      ])
    }
  }, [data])

  return (
    <Breadcrumbs>
      {routeHistory.map((v, i) => (
        <button
          key={v.id}
          className={cls.categories__button}
          onClick={(e) => handleClick(e, v, i)}
        >
          {v.name}
        </button>
      ))}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {isLoading && <Loader />}

        {!isLoading && open && !Boolean(openedCategory?.children.length) && (
          <Text>Дочерних категорий не обнаружено</Text>
        )}

        {!isLoading &&
          openedCategory?.children.map((child) => (
            <MenuItem key={child.id} onClick={() => handleSelect(child)}>
              {child.name}
            </MenuItem>
          ))}
      </Menu>
    </Breadcrumbs>
  )
}
