import { Breadcrumbs } from '@mui/material'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { splitByNewline } from '@/shared/utils/split-by-newline'
import { guidEmpty } from '@/entities/categories'

import { useCategoriesList } from '../lib/use-categories-list'

import { CategoryForm } from './components/category-form'
import { CategoriesObserver } from './components/categories-observer'

import cls from './categories-list.module.scss'

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

      {!values.categoryToCreate && !values.categoryToDelete && (
        <CategoriesObserver
          onDelete={handlers.setCategoryToDelete}
          onEdit={handlers.setCategoryToCreate}
          navigateTo={handlers.navigateTo}
          categories={values.categories}
          isLoading={values.isLoading}
        />
      )}

      {values.categoryToCreate && (
        <CategoryForm
          onClose={() => handlers.setCategoryToCreate(undefined)}
          category={values.categoryToCreate}
        />
      )}

      {values.categoryToDelete && (
        <section>
          <Text style={{ padding: '10px 0' }}>
            Вы действительно хотите удалить категорию{' '}
            <Text tag="span" color="error">
              {values.categoryToDelete.name}
            </Text>
            ?
          </Text>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button full onClick={() => handlers.onDelete()}>
              Подтвердить
            </Button>
            <Button
              full
              mode="neutral"
              onClick={() => handlers.setCategoryToDelete(undefined)}
            >
              Отменить
            </Button>
          </div>
        </section>
      )}

      {!values.categoryToCreate && !values.categoryToDelete && (
        <footer>
          <Button
            mode="secondary"
            full
            onClick={() =>
              handlers.setCategoryToCreate({
                children: [],
                description: '',
                id: guidEmpty,
                name: '',
                parentCategoryId: values.route?.id || guidEmpty,
              })
            }
          >
            Добавить
          </Button>
        </footer>
      )}
    </section>
  )
}
