import { Tab, Tabs } from '@mui/material'

import { Table } from '@/shared/ui/table'

import { useMyIssuesPage } from '@/features/my-issues'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { TableHead } from './components/table-head'
import { TableBody } from './components/table-body'

const MyIssues = () => {
  const { handlers, values } = useMyIssuesPage()

  return (
    <PageWrapper title="Мои задачи">
      <Tabs
        value={values.tab}
        onChange={(_, v) => handlers.setTab(v)}
        aria-label="table-my-issues"
      >
        <Tab label="Я - ответственный" value="responsible" />
        <Tab label="Я - исполнитель" value="executor" />
      </Tabs>

      <Table
        body={
          <TableBody tab={values.tab} data={values.issues?.issues} staff={values.staff} />
        }
        header={<TableHead tab={values.tab} />}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
        isPending={values.isPending}
      />
    </PageWrapper>
  )
}

export default MyIssues
