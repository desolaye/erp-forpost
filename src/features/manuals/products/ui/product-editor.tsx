import { ModalEditor } from '@/shared/ui/modal-editor'
import { Loader } from '@/shared/ui/loader'
import { FileAdd } from '@/shared/ui/file'

import { File } from '@/entities/files'
import { ManualHeader } from '@/entities/manuals'
import { useProductEditor } from '../lib/use-product-editor'

import { ProductForm } from './components/product-form'
import { ProductAttributes } from './components/product-attributes'

interface IProductEditorProps {
  id: string
  onClose?: () => void
}

export const ProductEditor = (props: IProductEditorProps) => {
  const { id, onClose } = props
  const { values, handlers } = useProductEditor(props)

  if (values.isLoading) return <Loader />

  return (
    <ModalEditor
      header={
        <ManualHeader
          id={id}
          onDelete={handlers.onDelete}
          setTab={handlers.setTab}
          tab={values.tab}
          tabs={[
            { label: 'Атрибуты', value: 'attributes', disabled: id === 'new' },
            { label: 'Совместимость', value: 'сompatibility', disabled: id === 'new' },
          ]}
        />
      }
    >
      {values.tab === 'data' && (
        <ProductForm
          data={values.product}
          onClose={() => onClose?.()}
          onMutate={handlers.onMutate}
          isError={values.isError}
          isPending={values.isPending}
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

      {values.tab === 'attributes' && <ProductAttributes productId={id} />}
    </ModalEditor>
  )
}
