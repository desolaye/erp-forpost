import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

import { useWarehouseProductsScanner } from '../lib/use-warehouse-products-scanner'
import { Button } from '@/shared/ui/button'
import { ProductScanned } from './components/scan-components/product-scanned'

interface IWarehouseProductsScannerProps {
  storageId: string
  onClose?: () => void
}

export const WarehouseProductsScanner = (props: IWarehouseProductsScannerProps) => {
  const { storageId, onClose } = props

  const { handlers, values } = useWarehouseProductsScanner(storageId)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Text size="xl" weight="semi">
        Сканирование кодов
      </Text>

      <Form onSubmit={handlers.submit} style={{ minHeight: 'fit-content' }}>
        <Input
          autoFocus
          value={values.barcode}
          onChange={(e) => handlers.setBarcode(e.target.value)}
          label="Введите штрих-код"
        />
      </Form>

      {values.codesStatus.map((v, i) => (
        <ProductScanned key={i} {...v} storageId={storageId} />
      ))}

      <Button full onClick={onClose}>
        Завершить
      </Button>
    </div>
  )
}
