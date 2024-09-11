import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { useStaffPage } from '@/features/manuals/staff'
import { StaffTableHead } from './components/staff-table-head'
import { StaffTableBody } from './components/staff-table-body'

export const ManualStaffPage = () => {
  const { values } = useStaffPage()

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text size="2xl" weight="semi">
        Сотрудники
      </Text>

      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        {/* <Button onClick={() => handlers.handleOpenModal('new')}>Добавить</Button> */}
      </Card>

      <Card>
        {values.isPending && <Text>Loading...</Text>}
        {!values.isPending && (
          <Table
            body={<StaffTableBody data={values.data} />}
            header={<StaffTableHead />}
          />
        )}
      </Card>
    </article>
  )
}
