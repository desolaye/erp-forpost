import { isValidElement, ReactNode } from 'react'

export const isRenderable = (value: unknown): value is ReactNode => {
  return ['string', 'number'].includes(typeof value) || isValidElement(value)
}
