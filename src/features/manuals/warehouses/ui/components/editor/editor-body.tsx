import { Loader } from '@/shared/ui/loader'
import { FileAdd } from '@/shared/ui/file'

import { StaffType, WarehouseType, WarehouseValidatorType } from '@/entities/manuals'
import { File, FileType } from '@/entities/files'

import { WarehouseForm } from '../warehouse-form'

interface IEditorBodyProps {
  currentTab: string
  isLoading?: boolean
  isFileLoading?: boolean
  id: string
  warehouse?: WarehouseType
  staff?: StaffType[]
  files?: FileType[]
  form?: {
    isPending: boolean
    isError: boolean
  }
  onClose?: () => void
  onMutate: (data: WarehouseValidatorType) => void
  onFileAdd: (file: File) => void
  onSearch: (value: string) => void
}

export const EditorBody = (props: IEditorBodyProps) => {
  const {
    id,
    warehouse,
    isLoading,
    currentTab,
    isFileLoading,
    files,
    staff,
    form,
    onMutate,
    onClose,
    onFileAdd,
    onSearch,
  } = props

  if (isLoading || isFileLoading) return <Loader />

  if (currentTab === 'data') {
    return (
      <WarehouseForm
        id={id}
        form={form}
        warehouse={warehouse}
        onSearch={onSearch}
        onClose={() => onClose?.()}
        onMutate={onMutate}
        staff={staff}
      />
    )
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
