import { publicApi } from '@/shared/api/public-api.config'
import { ItemValidatorType } from '../../model/item.schema'

type ItemPostType = ItemValidatorType & { techCardId: string }

export const postAddItemToCard = async (item: ItemPostType) => {
  const itemToSend = {
    ...item,
    productId: item.productId.value,
    quantity: Number(item.quantity),
  }

  console.log('ITEM TO SEND', itemToSend)

  const response = await publicApi.post<string>('v1/tech-card-item', itemToSend)

  return response
}
