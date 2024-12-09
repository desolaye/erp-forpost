import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import download from 'downloadjs'

import { IFileProps } from '../model/file-props.schema'
import { deleteFileById, getDownloadFile } from '../services'

export const useFile = (props: IFileProps) => {
  const { link, title } = props
  const queryClient = useQueryClient()

  const [selectedFile, setSelectedFile] = useState<Blob>()

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

  const { mutateAsync: selectAsync } = useMutation({
    mutationFn: () => getDownloadFile(link),
    onSuccess: async (res) => {
      setSelectedFile(res)
    },
  })

  const onDownload = () => mutateAsync()
  const onDelete = () => deleteAsync()
  const onSelect = () => selectAsync()
  const onClose = () => setSelectedFile(undefined)

  return { selectedFile, onDownload, onDelete, onSelect, onClose }
}
