import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Select } from '@/shared/ui/select'
import { ModalLayout } from '@/shared/ui/modal-layout'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { contractTypeToOptions, contractTypeToText } from '@/entities/manuals'
import { AgentEditor, useAgentsPage } from '@/features/manuals/agents'

import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { agentTableConfig } from '../utils/agent-table-config'

import cls from './agents-page.module.scss'

const ManualAgentsPage = () => {
  const { values, handlers } = useAgentsPage()
  const config = agentTableConfig()

  return (
    <PageWrapper title="Контрагенты">
      <Card style={{ flexDirection: 'row', zIndex: 100 }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <Select
          placeholder="Тип агента"
          options={contractTypeToOptions()}
          onChange={(val) => handlers.setContractorType(val?.value)}
          className={cls.agents_page__select}
          isClearable
        />
        <Button onClick={() => handlers.openModal('new')}>Добавить</Button>
      </Card>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
        isLoading={values.isLoading}
      >
        {values.agents?.map((row) => (
          <SmartTableRow
            key={row.id}
            row={{ ...row, contractorType: contractTypeToText(row.contractorType.value) }}
            onClick={() => handlers.setAgentId(row.id)}
          />
        ))}
      </SmartTable>

      <ModalLayout isOpen={Boolean(values.agentId)} onClose={handlers.openModal}>
        <AgentEditor id={values.agentId || ''} />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualAgentsPage
