import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Table } from '@/shared/ui/table'
import { ToolMenu } from '@/shared/ui/tool-menu'

import { ProcessCreator, useProcessesPage } from '@/features/manufacture/processes'
import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { processesToolMenu } from '../utils/processes-tool-menu'
import { ProcessesTableHead } from './components/processes-table-head'
import { ProcessesTableBody } from './components/processes-table-body'

export const ManufactureProcesses = () => {
  const { handlers, values } = useProcessesPage()

  return (
    <PageWrapper title="Производственные процессы">
      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        <Button onClick={() => handlers.openModal('new')}>Запланировать</Button>
      </Card>

      <ToolMenu
        tools={processesToolMenu({
          selectedLength: values.selectedIds.length,
          onComplete: handlers.completeAll,
          onLaunch: handlers.launchAll,
        })}
      />

      <Table
        body={
          <ProcessesTableBody
            onCheck={(id) => handlers.selectId(id)}
            data={values.processes?.manufacturingProcesses}
          />
        }
        header={<ProcessesTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />

      <ModalLayout isOpen={Boolean(values.id)} onClose={handlers.openModal}>
        <ProcessCreator onClose={handlers.openModal} />
      </ModalLayout>
    </PageWrapper>
  )
}
