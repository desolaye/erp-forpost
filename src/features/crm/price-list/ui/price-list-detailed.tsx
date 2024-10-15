import { PriceListType, PriceListValidatorType } from '@/entities/crm/price-list'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Text } from '@/shared/ui/text'
import { usePriceListDetailed } from '../lib/use-price-list-detailed'
import { PriceListForm } from './components/price-list-form'

interface IPriceListDetailedProps {
  priceList?: PriceListType

  onMutate: (data: PriceListValidatorType) => void
  onClose?: () => void
}

export const PriceListDetailed = (props: IPriceListDetailedProps) => {
  const { onMutate, onClose } = props
  const { handlers, values } = usePriceListDetailed(props)

  return (
    <ModalEditor
      body={
        <PriceListForm
          onMutate={onMutate}
          onClose={onClose}
          operations={values.operationOptions}
          products={values.productOptions}
          onSearch={handlers.setSearch}
          // priceList={values.defaultPriceList}
        />
      }
      header={
        <Text size="xl" weight="semi">
          Детали прайс-листа
        </Text>
      }
    />
  )
}
