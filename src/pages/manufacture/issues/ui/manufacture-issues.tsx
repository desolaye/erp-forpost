import { useParams } from '@tanstack/react-router'

import { Table } from '@/shared/ui/table'
import { ToolMenu } from '@/shared/ui/tool-menu'

import { useIssuesPage } from '@/features/manufacture/issues'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { issuesToolMenu } from '../utils/issues-tool-menu'
import { IssuesTableHead } from './components/issues-table-head'
import { IssuesTableBody } from './components/issues-table-body'

export const ManufactureIssues = () => {
  const { uuid } = useParams({ strict: false }) as { uuid: string }
  const { handlers, values } = useIssuesPage(uuid)

  return (
    <PageWrapper title="Производственные задачи">
      <ToolMenu
        tools={issuesToolMenu({
          selectedLength: values.selectedIds.length,
          onComplete: handlers.closeAll,
          onLaunch: handlers.launchAll,
        })}
      />

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
