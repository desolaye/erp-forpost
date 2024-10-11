import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { ToolMenu } from '@/shared/ui/tool-menu'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { routesPath } from '@/shared/config/routes-path.config'

import { ProcessCreator, useProcessesPage } from '@/features/manufacture/processes'
import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { processesToolMenu } from '../utils/processes-tool-menu'
import { processesTableConfig } from '../utils/processes-table.config'

const ManufactureProcesses = () => {
  const { handlers, values } = useProcessesPage()
  const config = processesTableConfig()

  return (
    <PageWrapper title="Производственные процессы">
      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск по продукту"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <Button onClick={() => handlers.openModal('new')}>Запланировать</Button>
      </Card>

      <ToolMenu
        tools={processesToolMenu({
          selectedLength: values.selectedIds.length,
          onComplete: handlers.completeAll,
          onLaunch: handlers.launchAll,
        })}
      />

      <SmartTable
        config={config}
        currentPage={values.page}
        pageCount={values.totalCount}
        onPageChange={handlers.setPage}
        check={{
          isAllChecked: handlers.isAllChecked(),
          onCheckAll: handlers.selectAll,
        }}
      >
        {values.processes?.map((row) => (
          <SmartTableRow
            key={row.id}
            config={config}
            row={row}
            check={{
              isChecked: values.selectedIds.includes(row.id),
              onCheck: () => handlers.selectId(row.id),
            }}
            to={routesPath.erp.manufacture.issues('/manufacture', row.id)}
          />
        ))}
      </SmartTable>

      <ModalLayout isOpen={Boolean(values.id)} onClose={handlers.openModal}>
        <ProcessCreator onClose={handlers.openModal} />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManufactureProcesses
