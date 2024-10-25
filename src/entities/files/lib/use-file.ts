import { useMutation, useQueryClient } from '@tanstack/react-query'
import download from 'downloadjs'

import { IFileProps } from '../model/file-props.schema'
import { deleteFileById, getDownloadFile } from '../services'

export const useFile = (props: IFileProps) => {
  const { link, title } = props
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

  return { onDownload, onDelete }
}
