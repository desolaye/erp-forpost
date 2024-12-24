import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { Loader } from '@/shared/ui/loader'

import { TechcardsCompositionType } from '@/entities/manuals/techcards'

import { TechcardOperation } from './components/techcard-operation'
import { useOperationsTab } from './use-operations-tab'

type OperationsTabProps = {
  cardId?: string
  operations?: TechcardsCompositionType['operations']
}

export const OperationsTab = (props: OperationsTabProps) => {
  const { handlers, values } = useOperationsTab(props)

  if (values.isPending) return <Loader />

  return (
    <section style={{ height: '100%', display: 'flex', gap: 8, flexDirection: 'column' }}>
      <Button mode="secondary" onClick={handlers.onAdd}>
        + Добавить операцию
      </Button>

      <main style={{ flex: 1, display: 'flex', gap: 16, flexDirection: 'column' }}>
        {values.editItems?.map((v) => (
          <TechcardOperation
            key={v.id}
            operation={v}
            operations={values.operations}
            onDelete={handlers.onDelete}
            onOperationEdit={(op) => handlers.onEditOperation(v.id, op)}
          />
        ))}
      </main>

      {values.isError && (
        <Text color="error" weight="semi">
          Не удалось сохранить все изменения
        </Text>
      )}

      <Button onClick={handlers.onMutate}>Сохранить операции</Button>
    </section>
  )
}
