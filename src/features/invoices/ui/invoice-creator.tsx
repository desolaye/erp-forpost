import { Text } from '@/shared/ui/text'
import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'

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
      body={
        values.isPending || values.isLoading ? (
          <Loader />
        ) : (
          <InvoiceForm
            agents={values.agents}
            products={values.products}
            onClose={onClose}
            onMutate={handlers.onMutate}
          />
        )
      }
    />
  )
}
