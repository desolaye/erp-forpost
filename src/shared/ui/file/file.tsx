import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Card } from '../card'

import cls from './file.module.scss'
import { Text } from '../text'

interface IFileProps {
  title: string
  onDownload?: () => void
}

export const File = (props: IFileProps) => {
  const { title, onDownload } = props

  return (
    <Card className={cls.file}>
      <DescriptionOutlinedIcon />
      <Text style={{ width: '100%' }} hideOverflow>
        {title}
      </Text>

      <div className={cls.file__download} onClick={onDownload}>
        <FileDownloadOutlinedIcon fontSize="large" />
      </div>
    </Card>
  )
}
