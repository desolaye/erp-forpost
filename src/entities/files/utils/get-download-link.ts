import { publicApi } from '@/shared/api/public-api.config'

export const getDownloadLink = (fileId: string) => {
  return `${publicApi.defaults.baseURL}/v1/files/download/${fileId}`
}
