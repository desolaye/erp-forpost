import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { useStaffPage } from '@/features/manuals/staff'
import { StaffTableHead } from './components/staff-table-head'
import { StaffTableBody } from './components/staff-table-body'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

export const ManualStaffPage = () => {
  const { values, handlers } = useStaffPage()

  return (
    <PageWrapper>
      <Text size="2xl" weight="semi">
        Сотрудники
      </Text>

      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
      </Card>

      <Table
        body={<StaffTableBody data={values.data} />}
        header={<StaffTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />
    </PageWrapper>
  )
}
