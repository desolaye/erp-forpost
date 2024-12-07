import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'

import { useInvoiceCreator } from '../lib/use-invoice-creator'
import { InvoiceForm } from './invoice-form'

interface IInvoiceCreatorProps {
  onClose?: () => void
}

export const InvoiceCreator = (props: IInvoiceCreatorProps) => {
  const { onClose } = props

  const { values, handlers } = useInvoiceCreator(props)

  return (
    <ModalEditor
      header={
        <Text size="lg" weight="semi">
          Создание нового счёта
        </Text>
      }
    >
      <InvoiceForm
        isError={values.isError}
        isLoading={values.isLoading}
        agents={values.agents}
        products={values.products}
        onClose={onClose}
        onMutate={handlers.onMutate}
      />
    </ModalEditor>
  )
}
