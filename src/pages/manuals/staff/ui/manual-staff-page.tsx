import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { StaffEditor, useStaffPage } from '@/features/manuals/staff'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'
import { ModalLayout } from '@/widgets/layouts/modal'

import { staffTableConfig } from '../utils/staff-table-config'

const ManualStaffPage = () => {
  const { values, handlers } = useStaffPage()
  const config = staffTableConfig()

  return (
    <PageWrapper title="Сотрудники">
      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        {values.user && values.user.role === 'Admin' && (
          <Button onClick={() => handlers.setId('new')}>Добавить</Button>
        )}
      </Card>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalCount}
      >
        {values.data?.map((row) => (
          <SmartTableRow
            key={row.id}
            config={config}
            row={row}
            onClick={() => handlers.openModal(row)}
          />
        ))}
      </SmartTable>

      <ModalLayout isOpen={Boolean(values.id)} onClose={handlers.openModal}>
        <StaffEditor
          id={values.id}
          onClose={handlers.openModal}
          staff={values.staffModal}
        />
      </ModalLayout>
    </PageWrapper>
  )
}

export default ManualStaffPage
