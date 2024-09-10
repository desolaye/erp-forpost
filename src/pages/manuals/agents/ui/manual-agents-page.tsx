import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

import { AgentEditor, useAgentsPage } from '@/features/manuals/agents'
import { ModalLayout } from '@/widgets/layouts/modal'

import { Table } from './components/table'

export const ManualAgentsPage = () => {
  const { values, handlers } = useAgentsPage()

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text size="2xl" weight="semi">
        Контрагенты
      </Text>

      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        <Button onClick={() => handlers.handleOpenModal('new')}>Добавить</Button>
      </Card>

      <Card>
        {values.isPending ? (
          <Text>Loading...</Text>
        ) : (
          <Table
            body={
              <>
                {values.agents?.map((v) => (
                  <Button
                    key={v.id}
                    mode="table"
                    onClick={() => handlers.handleOpenModal(v.id)}
                  >
                    {v.name}
                  </Button>
                ))}
              </>
            }
            header={<Text weight="semi">Имя агента</Text>}
          />
        )}
      </Card>

      <ModalLayout
        isOpen={Boolean(values.agentId)}
        onClose={() => handlers.handleOpenModal('')}
      >
        <AgentEditor id={values.agentId} onClose={() => handlers.handleOpenModal('')} />
      </ModalLayout>
    </article>
  )
}
