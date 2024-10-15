import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getFilesByParentId, postFilesLoad } from '@/entities/files'

export const useFileLoader = (id: string, queryKey: string) => {
  const queryClient = useQueryClient()

  const { data: files } = useQuery({
    queryFn: () => getFilesByParentId(id),
    queryKey: [queryKey, id],
    enabled: id !== 'new',
  })

  const { mutateAsync: mutateFile, isPending: isPendingFile } = useMutation({
    mutationFn: (file: File) => postFilesLoad(file, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey, id] }),
  })

  return { files, mutateFile, isPendingFile }
}
