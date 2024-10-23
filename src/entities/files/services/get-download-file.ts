import { publicApi } from '@/shared/api/public-api.config'

export const getDownloadFile = async (fileId: string) => {
  const response = await publicApi.get<Blob>(`/v1/files/download/${fileId}`, {
    responseType: 'blob',
  })

  return response.data
}
