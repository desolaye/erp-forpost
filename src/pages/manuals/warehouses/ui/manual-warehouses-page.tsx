import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { WarehouseEditor, useWarehousesPage } from '@/features/manuals/warehouses'
import { ModalLayout } from '@/widgets/layouts/modal'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

import { WarehousesTableBody } from './components/warehouses-table-body'

export const ManualWarehousesPage = () => {
  const { values, handlers } = useWarehousesPage()

  return (
    <PageWrapper>
      <Text size="2xl" weight="semi">
        Склады
      </Text>

      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        <Button onClick={() => handlers.handleOpenModal('new')}>Добавить</Button>
      </Card>

      <Table
        body={<WarehousesTableBody onModal={() => {}} data={values.data} />}
        header={<Text weight="semi">Название склада</Text>}
        isPending={values.isPending}
        page={values.page}
        setPage={handlers.setPage}
        totalCount={values.totalCount}
      />

      <ModalLayout
        isOpen={Boolean(values.id)}
        onClose={() => handlers.handleOpenModal('')}
      >
        <WarehouseEditor id={values.id} onClose={() => handlers.handleOpenModal('')} />
      </ModalLayout>
    </PageWrapper>
  )
}
