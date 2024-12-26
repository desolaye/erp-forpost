import { createContext } from 'react'
import { TableConfigType } from '../model/table-config.type'

export type SmartTableContextProps<T> = {
  config?: TableConfigType<T>
}

export const SmartTableContext = createContext<SmartTableContextProps<any>>({})
