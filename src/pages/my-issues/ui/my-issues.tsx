import { Tab, Tabs } from '@mui/material'

import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { Card } from '@/shared/ui/card'
import { ModalLayout } from '@/shared/ui/modal-layout'
import { routesPath } from '@/shared/config/routes-path.config'

import { SelectExecutor, useMyIssuesPage } from '@/features/my-issues'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { myIssuesTableConfig } from '../utils/my-issues-table.config'

import { MyIssuesTooltip } from './components/my-issues-tooltip'

const MyIssues = () => {
  const { handlers, values } = useMyIssuesPage()
  const config = myIssuesTableConfig(values.tab)
  const { root, proddevIssue } = routesPath.erp.manufacture

  return (
    <PageWrapper title="Мои задачи">
      <Tabs value={values.tab} onChange={(_, v) => handlers.setTab(v)}>
        <Tab label="Я - ответственный" value="responsible" />
        <Tab label="Я - исполнитель" value="executor" />
      </Tabs>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
        withActions
      >
        {values.issues?.issues.map((row) => (
          <SmartTableRow
            key={row.id}
            config={config}
            row={row}
            to={proddevIssue(root(), row.id)}
            actions={
              <MyIssuesTooltip onSetResponsible={() => handlers.setModalData(row)} />
            }
          />
        ))}
      </SmartTable>

      <ModalLayout
        isOpen={Boolean(values.modalData)}
        onClose={() => handlers.setModalData(undefined)}
        center
        bodyBg
      >
        <Card>
          <SelectExecutor
            onClose={() => handlers.setModalData(undefined)}
            defaultValue={{
              label: values.modalData?.executorName || '',
              value: values.modalData?.executorId || '',
            }}
            issueId={values.modalData?.id || ''}
            staff={values.staff}
          />
        </Card>
      </ModalLayout>
    </PageWrapper>
  )
}

export default MyIssues
