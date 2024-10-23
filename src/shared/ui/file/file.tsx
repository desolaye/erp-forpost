import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { useMutation } from '@tanstack/react-query'
import download from 'downloadjs'

import { Card } from '../card'
import { Text } from '../text'

import { getDownloadFile } from '@/entities/files'
import cls from './file.module.scss'

interface IFileProps {
  title: string
  link: string
}

export const File = (props: IFileProps) => {
  const { title, link } = props

  const { mutateAsync } = useMutation({
    mutationFn: () => getDownloadFile(link),
    onSuccess: (res) => {
      download(res, title)
    },
  })

  const onClick = () => mutateAsync()

  return (
    <Card className={cls.file}>
      <DescriptionOutlinedIcon />
      <Text style={{ width: '100%' }} hideOverflow>
        {title}
      </Text>

      <div className={cls.file__download} onClick={onClick}>
        <button>
          <FileDownloadOutlinedIcon fontSize="large" />
        </button>
      </div>
    </Card>
  )
}
