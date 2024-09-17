import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { AgentEditor, useAgentsPage } from '@/features/manuals/agents'
import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { AgentsTableHead } from './components/agents-table-head'
import { AgentsTableBody } from './components/agents-table-body'

export const ManualAgentsPage = () => {
  const { values, handlers } = useAgentsPage()

  return (
    <PageWrapper>
      <Text size="2xl" weight="semi">
        Контрагенты
      </Text>

      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        <Button onClick={() => handlers.openModal('new')}>Добавить</Button>
      </Card>

      <Table
        body={
          <AgentsTableBody
            data={values.agents?.contractors}
            onModal={handlers.openModal}
          />
        }
        header={<AgentsTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />

      <ModalLayout isOpen={Boolean(values.agentId)} onClose={handlers.openModal}>
        <AgentEditor id={values.agentId} onClose={handlers.openModal} />
      </ModalLayout>
    </PageWrapper>
  )
}
