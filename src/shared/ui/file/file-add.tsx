import { useState } from 'react'

import { Button } from '../button'
import { Text } from '../text'

interface IFileAddProps {
  onLoad?: (file: File) => void
}

export const FileAdd = (props: IFileAddProps) => {
  const { onLoad } = props

  const [isAdd, setIsAdd] = useState(false)
  const [file, setFile] = useState<File>()

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFiles = files as FileList
    setFile(selectedFiles?.[0])
  }

  const handleLoad = () => {
    if (onLoad && file) onLoad(file)
    onCancel()
  }

  const onCancel = () => {
    setIsAdd(false)
    setFile(undefined)
  }

  if (!isAdd) {
    return (
      <Button mode="secondary" full onClick={() => setIsAdd(true)}>
        Добавить
      </Button>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button full onClick={handleLoad} disabled={!file}>
          Загрузить
        </Button>
        <Button mode="secondary" full onClick={onCancel}>
          Отменить
        </Button>
      </div>
      <Text>Выберите файл</Text>
      <input type="file" onChange={selectFile} />
    </>
  )
}
