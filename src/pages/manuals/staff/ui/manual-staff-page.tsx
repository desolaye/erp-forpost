import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { StaffEditor, useStaffPage } from '@/features/manuals/staff'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'
import { ModalLayout } from '@/widgets/layouts/modal'

import { StaffTableHead } from './components/staff-table-head'
import { StaffTableBody } from './components/staff-table-body'

const ManualStaffPage = () => {
  const { values, handlers } = useStaffPage()

  return (
    <PageWrapper>
      <Text size="2xl" weight="semi">
        Сотрудники
      </Text>

      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        {values.user && values.user.role === 'Admin' && (
          <Button onClick={() => handlers.openModal('new')}>Добавить</Button>
        )}
      </Card>

      <Table
        body={<StaffTableBody data={values.data} />}
        header={<StaffTableHead />}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />

      <ModalLayout isOpen={Boolean(values.id)} onClose={handlers.openModal}>
        <StaffEditor id={values.id} onClose={handlers.openModal} />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualStaffPage
