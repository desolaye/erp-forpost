import { publicApi } from '@/shared/api/public-api.config'

export const postFilesLoad = async (file: File) => {
  const formData = new FormData()
  formData.append('File', file)

  const response = await publicApi.post<string>('v1/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response
}
