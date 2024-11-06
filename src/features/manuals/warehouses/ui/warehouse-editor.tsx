import { ModalEditor } from '@/shared/ui/modal-editor'

import { useWarehouseEditor } from '../lib/use-warehouse-editor'
import { EditorBody } from './components/editor/editor-body'
import { EditorHeader } from './components/editor/editor-header'
import { WarehouseType } from '@/entities/manuals'

interface IWarehouseEditorProps {
  id: string
  warehouse?: WarehouseType
  onSearch: (value: string) => void
  onClose?: () => void
}

export const WarehouseEditor = (props: IWarehouseEditorProps) => {
  const { id, warehouse, onClose, onSearch } = props
  const { values, handlers } = useWarehouseEditor(props)

  return (
    <ModalEditor
      body={
        <EditorBody
          form={{ isError: values.isError, isPending: values.isPending }}
          currentTab={values.tab}
          id={id}
          warehouse={warehouse}
          onFileAdd={handlers.mutateFile}
          onMutate={handlers.onMutate}
          onSearch={onSearch}
          files={values.files}
          isFileLoading={values.isPendingFile}
          isLoading={values.isLoading}
          onClose={onClose}
          staff={values.staff}
        />
      }
      header={
        <EditorHeader
          onTabChange={handlers.setTab}
          tab={values.tab}
          isNew={id === 'new'}
        />
      }
    />
  )
}
