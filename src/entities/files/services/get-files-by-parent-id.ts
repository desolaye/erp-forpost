import { publicApi } from '@/shared/api/public-api.config'
import { FileType } from '../model/file.model'

export const getFilesByParentId = async (parentId: string) => {
  const response = await publicApi.get<FileType[]>(`v1/files/${parentId}`)
  return response.data
}
