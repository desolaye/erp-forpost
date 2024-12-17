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
    <ModalEditor>
      <InvoiceForm
        isError={values.isError}
        isLoading={values.isLoading}
        agents={values.agents}
        products={values.products}
        onClose={onClose}
        onMutate={handlers.onMutate}
        onAgentSearch={handlers.onAgentSearch}
        onProductSearch={handlers.onProductSearch}
      />
    </ModalEditor>
  )
}
