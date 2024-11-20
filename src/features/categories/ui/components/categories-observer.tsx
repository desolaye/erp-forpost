import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditNoteIcon from '@mui/icons-material/EditNote'

import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'

import cls from '../categories-list.module.scss'
import { CategoryType } from '@/entities/categories'

type CategoresObserverProps = {
  isLoading?: boolean
  categories?: CategoryType[]

  navigateTo: (cat: CategoryType) => void
  onEdit: (cat: CategoryType) => void
  onDelete: (cat: CategoryType) => void
}

export const CategoriesObserver = (props: CategoresObserverProps) => {
  const { navigateTo, onDelete, onEdit, categories, isLoading } = props

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
            <div key={v.id} style={{ display: 'flex', gap: 8 }}>
              <Button mode="neutral" full onClick={() => navigateTo(v)}>
                {v.name}
              </Button>
              <Button
                mode="neutral"
                onClick={() => onEdit(v)}
                style={{ padding: '4px 8px' }}
              >
                <EditNoteIcon />
              </Button>
              <Button
                mode="secondary"
                onClick={() => onDelete(v)}
                style={{ padding: '4px 8px' }}
              >
                <DeleteOutlineIcon />
              </Button>
            </div>
          ))}
      </section>
    </main>
  )
}
