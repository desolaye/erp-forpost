import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Loader } from '@/shared/ui/loader'

import { operationsTableConfig } from '../utils/operations-table.config'
import { useOperationsEditor } from '../lib/use-operations-editor'

import { OperationsForm } from './components/operations-form'

import cls from './operations-editor.module.scss'

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
    <section className={cls.operations_editor}>
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
            key={v.id}
            row={v}
            onClick={() => handlers.selectOperation(v.id)}
          />
        ))}
      </SmartTable>
    </section>
  )
}
