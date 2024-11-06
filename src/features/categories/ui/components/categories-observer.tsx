import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'

import cls from '../categories-list.module.scss'
import { CategoryType } from '@/entities/categories'

type CategoresObserverProps = {
  isLoading?: boolean
  categories?: CategoryType[]

  navigateTo: (cat: CategoryType) => void
}

export const CategoriesObserver = (props: CategoresObserverProps) => {
  const { navigateTo, categories, isLoading } = props

  return (
    <main className={cls.categories}>
      <section className={cls.categories__list}>
        {isLoading && <Loader />}

        {!isLoading && !Boolean(categories?.length) && (
          <EmptyCard style={{ height: '100%' }} />
        )}

        {!isLoading &&
          Boolean(categories?.length) &&
          categories?.map((v) => (
            <Button key={v.id} mode="neutral" full onClick={() => navigateTo(v)}>
              {v.name}
            </Button>
          ))}
      </section>
    </main>
  )
}
