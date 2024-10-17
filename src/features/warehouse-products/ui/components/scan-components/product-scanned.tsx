import { Checkbox, Tab, Tabs } from '@mui/material'
import ReactSelect from 'react-select'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

import { useProductScanned } from './use-product-scanned'

interface IProductScannedProps {
  status: 'success' | 'error'
  barcode: string
  storageId: string
}

export const ProductScanned = (props: IProductScannedProps) => {
  const { barcode, status } = props

  const { handlers, values } = useProductScanned(props)

  if (status === 'success') {
    return (
      <Card>
        <Text weight="semi" size="lg">
          Продукт с кодом {barcode} успешно добавлен на склад
        </Text>
      </Card>
    )
  }

  if (values.createdByUser) {
    return (
      <Card>
        <Text weight="semi" size="lg">
          Продукт с кодом {barcode} обработан вручную
        </Text>
      </Card>
    )
  }

  return (
    <Card style={{ border: '1px solid #eee' }}>
      <Text color="error" weight="semi" size="lg">
        Продукт с кодом {barcode} не обнаружен. Выберите продукт из списка или создайте
        новый
      </Text>

      <Tabs value={values.tab} onChange={(_, v) => handlers.tabChange(v)}>
        <Tab label="Выбрать продукт" value="select" />
        <Tab label="Создать новый" value="create" />
      </Tabs>

      {values.tab === 'select' && (
        <>
          <ReactSelect
            options={values.products}
            onInputChange={handlers.setSearch}
            value={values.productSelected}
            onChange={(val) => handlers.setProductSelected(val || undefined)}
          />

          <Input
            label="Количество товара"
            onChange={(e) => handlers.setQuantity(e.target.value)}
            value={values.quantity}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Button full mode="secondary" onClick={handlers.selectProduct}>
              Добавить
            </Button>
            <Text size="sm">
              Это действие добавит штрих-код{' '}
              <Text tag="span" weight="semi" size="sm">
                {barcode}
              </Text>{' '}
              к продукту и добавит выбранный продукт на данный склад
            </Text>
          </div>
        </>
      )}

      {values.tab === 'create' && (
        <>
          <Input
            label="Название продукта"
            value={values.productName}
            onChange={(e) => handlers.setProductName(e.target.value)}
          />

          <Input
            label="Количество продукта"
            value={values.quantity}
            onChange={(e) => handlers.setQuantity(e.target.value)}
          />

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Checkbox />
            <Text>Закупочный товар</Text>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Button full onClick={handlers.createProduct} mode="secondary">
              Создать
            </Button>
            <Text size="sm">
              Это действие создаст продукт, добавит штрих-код{' '}
              <Text tag="span" weight="semi" size="sm">
                {barcode}
              </Text>{' '}
              к нему и добавит созданный продукт на данный склад
            </Text>
          </div>
        </>
      )}
    </Card>
  )
}
