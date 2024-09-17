import { ButtonHTMLAttributes } from 'react'

import cls from './button.module.scss'

type ButtonMode = 'primary' | 'table' | 'secondary' | 'neutral'

const modeStyle: Record<ButtonMode, string> = {
  primary: cls.mode_primary,
  table: cls.mode_table,
  secondary: cls.mode_secondary,
  neutral: cls.mode_neutral,
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: ButtonMode
  full?: boolean
}

export { modeStyle, type IButtonProps, cls }
