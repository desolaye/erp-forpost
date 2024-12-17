import { ChangeEvent, useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'

import { Button } from '../button'
import { Text } from '../text'

import cls from './file-add.module.scss'

interface IFileAddProps {
  onLoad?: (file: File) => void
}

export const FileAdd = (props: IFileAddProps) => {
  const { onLoad } = props

  const [file, setFile] = useState<File>()

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFiles = files as FileList
    setFile(selectedFiles?.[0])
  }

  const handleLoad = () => {
    if (onLoad && file) onLoad(file)
    onCancel()
  }

  const onCancel = () => setFile(undefined)

  if (!file) {
    return (
      <label className={cls.file_add}>
        <input type="file" onChange={selectFile} style={{ display: 'none' }} />
        <div className={cls.file_add__container}>
          <UploadFileIcon />
          <Text color="inherit">Добавить файл</Text>
        </div>
      </label>
    )
  }

  return (
    <div className={cls.file_add__container} style={{ flexDirection: 'column' }}>
      <Text>
        Выбран файл:{' '}
        <Text weight="semi" tag="span" breakAll>
          {file.name}
        </Text>
      </Text>
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <Button onClick={handleLoad} disabled={!file} full>
          Загрузить
        </Button>
        <Button mode="secondary" onClick={onCancel} full>
          Отменить
        </Button>
      </div>
    </div>
  )
}
