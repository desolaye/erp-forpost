import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'

import { IFileProps } from '../model/file-props.schema'
import cls from './file.module.scss'
import { useFile } from '../lib/use-file'

export const File = (props: IFileProps) => {
  const { title } = props
  const { onDelete, onDownload } = useFile(props)

  return (
    <Card className={cls.file}>
      <DescriptionOutlinedIcon />
      <Text style={{ width: '100%' }} hideOverflow>
        {title}
      </Text>

      <div className={cls.file__actions}>
        <button className={cls.file__button} onClick={onDownload}>
          <FileDownloadOutlinedIcon fontSize="large" />
        </button>
        <button className={cls.file__button} onClick={onDelete}>
          <DeleteOutlineIcon fontSize="large" />
        </button>
      </div>
    </Card>
  )
}
