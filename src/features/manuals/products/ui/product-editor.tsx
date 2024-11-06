import { ModalEditor } from '@/shared/ui/modal-editor'

import { useProductEditor } from '../lib/use-product-editor'

import { EditorHeader } from './components/editor/editor-header'
import { EditorBody } from './components/editor/editor-body'

interface IProductEditorProps {
  id: string
  onClose?: () => void
}

export const ProductEditor = (props: IProductEditorProps) => {
  const { id, onClose } = props
  const { values, handlers } = useProductEditor(props)

  return (
    <ModalEditor
      body={
        <EditorBody
          onFileAdd={handlers.mutateFile}
          form={{ isError: values.isError, isPending: values.isPending }}
          currentTab={values.tab}
          onMutate={handlers.onMutate}
          isLoading={values.isLoading}
          isFileLoading={values.isPendingFile}
          onClose={onClose}
          product={values.product}
          files={values.files}
        />
      }
      header={
        <EditorHeader
          isNew={id === 'new'}
          onTabChange={handlers.setTab}
          tab={values.tab}
        />
      }
    />
  )
}
