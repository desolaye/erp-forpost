import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { AgentEditor, useAgentsPage } from '@/features/manuals/agents'

import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { agentTableConfig } from '../utils/agent-table-config'

const ManualAgentsPage = () => {
  const { values, handlers } = useAgentsPage()
  const config = agentTableConfig()

  return (
    <PageWrapper title="Контрагенты">
      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <Button onClick={() => handlers.openModal('new')}>Добавить</Button>
      </Card>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.agents?.map((row) => (
          <SmartTableRow key={row.id} config={config} row={row} />
        ))}
      </SmartTable>

      <ModalLayout isOpen={Boolean(values.agentId)} onClose={handlers.openModal}>
        <AgentEditor id={values.agentId} onClose={handlers.openModal} />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualAgentsPage
