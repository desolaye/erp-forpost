import { publicApi } from '@/shared/api/public-api.config'
import { ItemValidatorType } from '../../model/item.schema'

type ItemPostType = ItemValidatorType & { techCardId: string }

export const postAddItemToCard = async (item: ItemPostType) => {
  const response = await publicApi.post<string>('v1/tech-card-item', {
    ...item,
    quantity: Number(item.quantity),
  })

  return response
}
