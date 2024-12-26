import { isValidElement, ReactNode } from 'react'

export const renderTableItem = (value: unknown) => {
  if (['string', 'number'].includes(typeof value) || isValidElement(value)) {
    return value as ReactNode
  }

  return null
}
