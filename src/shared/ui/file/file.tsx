import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Card } from '../card'

import cls from './file.module.scss'
import { Text } from '../text'
import { Link } from '@tanstack/react-router'
import { getDownloadLink } from '@/entities/files'

interface IFileProps {
  title: string
  link: string
  onDownload?: () => void
}

export const File = (props: IFileProps) => {
  const { title, link, onDownload } = props

  return (
    <Card className={cls.file}>
      <DescriptionOutlinedIcon />
      <Text style={{ width: '100%' }} hideOverflow>
        {title}
      </Text>

      <div className={cls.file__download} onClick={onDownload}>
        <Link to={getDownloadLink(link)} target="_blank" download>
          <FileDownloadOutlinedIcon fontSize="large" />
        </Link>
      </div>
    </Card>
  )
}
