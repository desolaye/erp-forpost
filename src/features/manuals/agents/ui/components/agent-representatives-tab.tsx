import { Loader } from '@/shared/ui/loader'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { useAgentRepresentativesTab } from '../../lib/use-agent-representatives-tab'
import { agentRepresentivesTableConfig } from '../../utils/agent-representives-table.config'

import { AgentRepresentativesForm } from './agent-representatives-form'
import { AgentRepresentativesTooltip } from './agent-representatives-tooltip'

type AgentRepresentativesTabProps = {
  contractorId: string
}

export const AgentRepresentativesTab = (props: AgentRepresentativesTabProps) => {
  const { contractorId } = props
  const { handlers, values } = useAgentRepresentativesTab(props)
  const config = agentRepresentivesTableConfig()

  if (values.isLoading) return <Loader />

  if (values.editEntity) {
    return (
      <AgentRepresentativesForm
        onClose={() => handlers.setEditEntity(undefined)}
        onMutate={handlers.onMutate}
        representative={{ ...values.editEntity, contractorId }}
        isError={values.isError}
        isPending={values.isPending}
      />
    )
  }

  if (values.deleteEntity) {
    return (
      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Text>
          Вы уверены, что хотите удалить представителя{' '}
          <Text tag="span" color="error" weight="semi">
            {values.deleteEntity.name}
          </Text>
          ?
        </Text>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button full onClick={() => handlers.onDelete(values.deleteEntity!.id)}>
            Подтвердить
          </Button>
          <Button mode="neutral" full onClick={() => handlers.setDeleteEntity(undefined)}>
            Отменить
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Button
        mode="secondary"
        full
        onClick={() =>
          handlers.setEditEntity({
            id: 'new',
            description: '',
            name: '',
            post: '',
            contractorId,
          })
        }
      >
        + Добавить представителя
      </Button>
      <SmartTable
        config={config}
        currentPage={0}
        onPageChange={() => {}}
        pageCount={0}
        withActions
      >
        {values.representatives?.map((v) => (
          <SmartTableRow
            key={v.id}
            row={v}
            actions={
              <AgentRepresentativesTooltip
                onDelete={() => handlers.setDeleteEntity(v)}
                onMutate={() => handlers.setEditEntity(v)}
              />
            }
          />
        ))}
      </SmartTable>
    </section>
  )
}
