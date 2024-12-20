import { createContext } from 'react'

export type ModalLayoutContextProps = {
  onClose?: () => void
}

export const ModalLayoutContext = createContext<ModalLayoutContextProps>({
  onClose: () => {},
})
