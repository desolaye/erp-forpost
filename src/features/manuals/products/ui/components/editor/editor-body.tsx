import { Loader } from '@/shared/ui/loader'
import { FileAdd } from '@/shared/ui/file'

import { ProductType, ProductValidatorType } from '@/entities/manuals'
import { File, FileType } from '@/entities/files'

import { ProductForm } from '../product-form'

interface IEditorBodyProps {
  currentTab: string
  isLoading?: boolean
  isFileLoading?: boolean
  product?: ProductType
  files?: FileType[]
  onClose?: () => void
  onMutate: (data: ProductValidatorType) => void
  onFileAdd: (file: File) => void
}

export const EditorBody = (props: IEditorBodyProps) => {
  const {
    onMutate,
    product,
    isLoading,
    currentTab,
    isFileLoading,
    files,
    onClose,
    onFileAdd,
  } = props

  if (isLoading || isFileLoading) return <Loader />

  if (currentTab === 'data') {
    return <ProductForm data={product} onClose={() => onClose?.()} onMutate={onMutate} />
  }

  if (currentTab === 'files') {
    return (
      <>
        <FileAdd onLoad={onFileAdd} />
        {files?.map((file) => (
          <File title={file.fileName} link={file.id} key={file.id} />
        ))}
      </>
    )
  }

  return null
}
