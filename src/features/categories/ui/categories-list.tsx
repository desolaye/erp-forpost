import { Breadcrumbs } from '@mui/material'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { splitByNewline } from '@/shared/utils/split-by-newline'

import { useCategoriesList } from '../lib/use-categories-list'

import cls from './categories-list.module.scss'
import { CategoryForm } from './components/category-form'
import { CategoriesObserver } from './components/categories-observer'

export const CategoriesList = () => {
  const { values, handlers } = useCategoriesList()

  return (
    <section className={cls.categories__section}>
      <header className={cls.categories__header}>
        <Breadcrumbs>
          <button className={cls.categories__button} onClick={handlers.navigateToRoot}>
            Основные
          </button>
          {values.routeHistory.map((v) => (
            <button
              key={v.id}
              className={cls.categories__button}
              onClick={() => handlers.navigateTo(v)}
            >
              {v.name}
            </button>
          ))}
        </Breadcrumbs>
        {values.route && (
          <section>
            <Text weight="semi" size="lg">
              Описание
            </Text>
            {splitByNewline(values.route.description).map((v) => (
              <Text key={v}>{v}</Text>
            ))}
          </section>
        )}
      </header>

      {!values.isCreating && (
        <CategoriesObserver
          navigateTo={handlers.navigateTo}
          categories={values.categories}
          isLoading={values.isLoading}
        />
      )}

      {values.isCreating && (
        <CategoryForm
          onClose={() => handlers.setIsCreating(false)}
          parentCategoryId={values.route?.id}
        />
      )}

      {!values.isCreating && (
        <footer>
          <Button mode="secondary" full onClick={() => handlers.setIsCreating(true)}>
            Добавить
          </Button>
        </footer>
      )}
    </section>
  )
}
