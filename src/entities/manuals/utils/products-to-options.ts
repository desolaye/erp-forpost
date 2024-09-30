import { ProductType } from '../model/product.schema'

export const productsToOptions = (products?: ProductType[]) => {
  return !products ? [] : products.map((v) => ({ label: v.name, value: v.id }))
}
