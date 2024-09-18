import { useParams } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Table } from '@/shared/ui/table'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { IssuesTableHead } from './components/issues-table-head'
import { IssuesTableBody } from './components/issues-table-body'
import { useIssuesPage } from '@/features/manufacture/issues'

export const ManufactureIssues = () => {
  const { uuid } = useParams({ strict: false }) as { uuid: string }
  const { handlers, values } = useIssuesPage(uuid)

  return (
    <PageWrapper title="Производственные задачи">
      <div style={{ display: 'flex', gap: 8, justifyContent: 'end' }}>
        <Button
          disabled={values.selectedIds.length === 0}
          mode="secondary"
          onClick={handlers.launchAll}
        >
          Запустить
        </Button>
        <Button
          disabled={values.selectedIds.length === 0}
          mode="secondary"
          onClick={handlers.closeAll}
        >
          Завершить
        </Button>
      </div>

      <Table
        body={<IssuesTableBody onCheck={handlers.selectId} data={values.issues} />}
        header={<IssuesTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />
    </PageWrapper>
  )
}
