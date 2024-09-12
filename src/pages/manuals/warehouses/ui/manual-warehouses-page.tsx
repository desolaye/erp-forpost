import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Table } from '@/shared/ui/table'

import { WarehouseEditor, useWarehousesPage } from '@/features/manuals/warehouses'
import { ModalLayout } from '@/widgets/layouts/modal'
import { Loader } from '@/shared/ui/loader'
import { WarehousesTableBody } from './components/warehouses-table-body'

export const ManualWarehousesPage = () => {
  const { values, handlers } = useWarehousesPage()

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text size="2xl" weight="semi">
        Склады
      </Text>

      <Card style={{ flexDirection: 'row' }}>
        <Input full placeholder="Поиск" />
        <Button onClick={() => handlers.handleOpenModal('new')}>Добавить</Button>
      </Card>

      <Card>
        {values.isPending && <Loader />}
        {!values.isPending && (
          <Table
            body={
              <WarehousesTableBody
                onModal={handlers.handleOpenModal}
                data={values.data}
              />
            }
            header={<Text weight="semi">Название склада</Text>}
          />
        )}
      </Card>

      <ModalLayout
        isOpen={Boolean(values.id)}
        onClose={() => handlers.handleOpenModal('')}
      >
        <WarehouseEditor id={values.id} onClose={() => handlers.handleOpenModal('')} />
      </ModalLayout>
    </article>
  )
}
