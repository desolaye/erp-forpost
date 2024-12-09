import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'

import { IFileProps } from '../model/file-props.schema'
import { useFile } from '../lib/use-file'

import { FileViewer } from './viewer'
import cls from './file.module.scss'

export const File = (props: IFileProps) => {
  const { title } = props
  const { selectedFile, onDelete, onDownload, onSelect, onClose } = useFile(props)

  return (
    <Card className={cls.file}>
      <DescriptionOutlinedIcon />
      <Text style={{ width: '100%' }} hideOverflow>
        {title}
      </Text>

      <div className={cls.file__actions}>
        {title.match(/\.pdf$/gi)?.length && (
          <button className={cls.file__button} onClick={onSelect}>
            <FileOpenOutlinedIcon fontSize="large" />
          </button>
        )}
        <button className={cls.file__button} onClick={onDownload}>
          <FileDownloadOutlinedIcon fontSize="large" />
        </button>
        <button className={cls.file__button} onClick={onDelete}>
          <DeleteOutlineIcon fontSize="large" />
        </button>
      </div>

      {selectedFile && <FileViewer file={selectedFile} onClose={onClose} />}
    </Card>
  )
}
