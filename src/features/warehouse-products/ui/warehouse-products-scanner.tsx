import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Tooltip } from '@mui/material'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

import { useWarehouseProductsScanner } from '../lib/use-warehouse-products-scanner'

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
      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text size="xl" weight="semi">
          Сканирование кодов
        </Text>

        <Tooltip
          title={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Text>Для успешного сканирования выполните следующие этапы:</Text>
              <Text>1) Отсканируйте лоток с товаром</Text>
              <Text>2) Отсканируйте штрихкод с номенклатурой товара</Text>
              <Text>
                3) Отсканируйте штрихкод с количеством товара или введите вручную
              </Text>
              <Text>4) Для каждого следующего товара повторите пункты 1-3</Text>
              <Text size="sm">
                При открытии окна сканирования, поле с лотком выделяется автоматически
              </Text>
              <Text weight="semi" size="sm">
                Важно: при следовании пунктов 1-4 все действия на сайте выполняются
                автоматически. Остается только сканировать согласно пунктам
              </Text>
            </div>
          }
        >
          <HelpOutlineIcon />
        </Tooltip>
      </div>

      <Form onSubmit={handlers.submit} style={{ minHeight: 275 }}>
        <Input
          autoFocus
          value={values.productId}
          onChange={(e) => handlers.setProductId(e.target.value)}
          onKeyDown={handlers.onKeyDown}
          label="Отсканируйте лоток"
          ref={values.refProductId}
        />
        <Input
          value={values.barcode}
          onChange={(e) => handlers.setBarcode(e.target.value)}
          onKeyDown={handlers.onKeyDown}
          label="Отсканируйте номенклатуру"
          ref={values.refBarcode}
        />
        <Input
          value={values.quantity}
          onChange={(e) => handlers.setQuantity(e.target.value)}
          label="Отсканируйте (или введите) кол-во товара"
          ref={values.refQuantity}
          onKeyDown={handlers.onKeyDown}
        />
        <Button mode="secondary">Сохранить</Button>
      </Form>

      {values.codesStatus.map((v, i) => (
        <Text weight="semi" key={i} color={v.status === 'success' ? 'black' : 'error'}>
          {v.barcode} отсканирован и добавлен к товару {v.productName}
        </Text>
      ))}

      <Button full onClick={onClose}>
        Завершить
      </Button>
    </div>
  )
}
