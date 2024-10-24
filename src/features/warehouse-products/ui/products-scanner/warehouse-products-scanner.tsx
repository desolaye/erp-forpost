import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Tooltip } from '@mui/material'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

import { useWarehouseProductsScanner } from '../../lib/use-warehouse-products-scanner'

import { TooltipTitle } from './tooltip-title'
import cls from './warehouse-products-scanner.module.scss'

interface IWarehouseProductsScannerProps {
  storageId: string
  onClose?: () => void
}

export const WarehouseProductsScanner = (props: IWarehouseProductsScannerProps) => {
  const { storageId, onClose } = props

  const { handlers, values } = useWarehouseProductsScanner(storageId)

  return (
    <div className={cls.product_scanner}>
      <div className={cls.product_scanner__form}>
        <Text size="xl" weight="semi">
          Сканирование кодов
        </Text>

        <Tooltip title={<TooltipTitle />}>
          <HelpOutlineIcon />
        </Tooltip>
      </div>

      <Form onSubmit={handlers.submit} style={{ minHeight: 275 }}>
        <Input
          autoFocus
          value={values.productId}
          onChange={(e) => handlers.setProductId(e.target.value)}
          onKeyDown={handlers.onKeyDown}
          label="Отсканируйте QR подгруппы"
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
          {v.status === 'success'
            ? `${v.barcode} отсканирован и добавлен к товару ${v.productName} в количестве ${v.quantity}`
            : `${v.barcode} не был отсканирован. Убедитесь, что даннные отсканированы верно`}
        </Text>
      ))}

      <Button full onClick={onClose}>
        Завершить
      </Button>
    </div>
  )
}
