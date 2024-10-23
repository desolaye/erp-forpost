import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import download from 'downloadjs'

import { Card } from '../card'
import { Text } from '../text'

import { deleteFileById, getDownloadFile } from '@/entities/files'
import cls from './file.module.scss'

interface IFileProps {
  title: string
  link: string
}

export const File = (props: IFileProps) => {
  const { title, link } = props

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: () => getDownloadFile(link),
    onSuccess: (res) => download(res, title),
  })

  const { mutateAsync: deleteAsync } = useMutation({
    mutationFn: () => deleteFileById(link),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files_all'] })
    },
  })

  const onDownload = () => mutateAsync()
  const onDelete = () => deleteAsync()

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
