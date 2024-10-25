import { FileAdd } from '@/shared/ui/file'
import { File, FileType } from '@/entities/files'
import { Card } from '@/shared/ui/card'

interface ITechcardFilesInfoProps {
  tab: number
  index: number
  files?: FileType[]
  onFileAdd: (file: File) => void
}

export const TechcardFilesInfo = (props: ITechcardFilesInfoProps) => {
  const { index, onFileAdd, tab, files } = props
  if (tab !== index) return null

  return (
    <Card style={{ height: '100%' }}>
      <FileAdd onLoad={onFileAdd} />
      {files?.map((file) => <File title={file.fileName} link={file.id} key={file.id} />)}
    </Card>
  )
}
