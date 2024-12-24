import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'

import { operationsTableConfig } from '../utils/operations-table.config'
import { useOperationsEditor } from '../lib/use-operations-editor'

import { OperationsForm } from './components/operations-form'

export const OperationsEditor = () => {
  const { values, handlers } = useOperationsEditor()
  const config = operationsTableConfig()

  if (values.isLoading) return <Loader />

  if (values.selectedOperation) {
    return (
      <OperationsForm
        id={values.selectedOperation}
        operation={values.operation}
        onClose={() => handlers.selectOperation('')}
      />
    )
  }

  return (
    <section
      style={{
        display: 'flex',
        gap: 8,
        flexDirection: 'column',
        padding: 16,
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Text size="lg" weight="semi">
        Редактор операций
      </Text>

      <Button mode="secondary" onClick={() => handlers.selectOperation('new')}>
        + Добавить операцию
      </Button>

      <SmartTable
        config={config}
        currentPage={0}
        onPageChange={() => {}}
        pageCount={0}
        isLoading={values.isLoading}
      >
        {values.operations?.map((v) => (
          <SmartTableRow
            onClick={() => handlers.selectOperation(v.id)}
            config={config}
            row={v}
          />
        ))}
      </SmartTable>
    </section>
  )
}
