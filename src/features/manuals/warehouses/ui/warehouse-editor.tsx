import { ModalEditor } from '@/shared/ui/modal-editor'
import { FileAdd } from '@/shared/ui/file'
import { Loader } from '@/shared/ui/loader'

import { File } from '@/entities/files'
import { ManualHeader, WarehouseType } from '@/entities/manuals'

import { useWarehouseEditor } from '../lib/use-warehouse-editor'

import { WarehouseForm } from './components/warehouse-form'

interface IWarehouseEditorProps {
  warehouse?: WarehouseType
  onSearch: (value: string) => void
  onClose?: () => void
}

export const WarehouseEditor = (props: IWarehouseEditorProps) => {
  const { warehouse, onClose, onSearch } = props
  const { values, handlers } = useWarehouseEditor(props)

  if (values.isLoading) return <Loader />

  return (
    <ModalEditor
      header={
        <ManualHeader
          id={warehouse?.id || 'new'}
          onDelete={handlers.onDelete}
          setTab={handlers.setTab}
          tab={values.tab}
        />
      }
    >
      {values.tab === 'data' && (
        <WarehouseForm
          isError={values.isError}
          isPending={values.isPendingMutate}
          warehouse={warehouse}
          onSearch={onSearch}
          onClose={() => onClose?.()}
          onMutate={handlers.onMutate}
          staff={values.staff}
        />
      )}

      {values.tab === 'files' && (
        <>
          <FileAdd onLoad={handlers.mutateFile} />
          {values.files?.map((file) => (
            <File title={file.fileName} link={file.id} key={file.id} />
          ))}
        </>
      )}
    </ModalEditor>
  )
}
