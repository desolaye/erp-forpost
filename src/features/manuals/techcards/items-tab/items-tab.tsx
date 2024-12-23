import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { Loader } from '@/shared/ui/loader'

import { TechcardsCompositionType } from '@/entities/manuals/techcards'

import { TechcardItem } from './components/techcard-item'
import { useItemsTab } from './use-items-tab'

type ItemsTabProps = {
  cardId?: string
  items?: TechcardsCompositionType['items']
}

export const ItemsTab = (props: ItemsTabProps) => {
  const { handlers, values } = useItemsTab(props)

  if (values.isPending) return <Loader />

  return (
    <section style={{ height: '100%', display: 'flex', gap: 8, flexDirection: 'column' }}>
      <Button mode="secondary" onClick={handlers.onAdd}>
        + Добавить компонент
      </Button>

      <main style={{ flex: 1, display: 'flex', gap: 16, flexDirection: 'column' }}>
        {values.editItems?.map((v) => (
          <TechcardItem
            key={v.id}
            item={v}
            products={values.products}
            onDelete={handlers.onDelete}
            onProductEdit={(pr) => handlers.onEditProduct(v.id, pr)}
            onQuantityEdit={(quantity) => handlers.onEditQuantity(v.id, quantity)}
            onSearch={handlers.onSearch}
          />
        ))}
      </main>

      {values.isError && (
        <Text color="error" weight="semi">
          Не удалось сохранить все изменения
        </Text>
      )}

      <Button onClick={handlers.onMutate}>Сохранить компоненты</Button>
    </section>
  )
}
