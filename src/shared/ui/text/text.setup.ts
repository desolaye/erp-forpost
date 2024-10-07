import { CSSProperties } from 'react'
import cls from './text.module.scss'

type TextTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'a'
type TextWeight = 'base' | 'medium' | 'semi' | 'bold'
type TextColor = 'black' | 'primary' | 'error' | 'white'
type TextSize =
  | 'base'
  | 'sm'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'

const colorStyle: Record<TextColor, string> = {
  black: cls.color_black,
  error: cls.color_error,
  primary: cls.color_primary,
  white: cls.color_white,
}

const weightStyle: Record<TextWeight, string> = {
  base: cls.weight_base,
  medium: cls.weight_medium,
  semi: cls.weight_semi,
  bold: cls.weight_bold,
}

const sizeStyle: Record<TextSize, string> = {
  sm: cls.size_sm,
  base: cls.size_base,
  lg: cls.size_lg,
  xl: cls.size_xl,
  '2xl': cls.size_2xl,
  '3xl': cls.size_3xl,
  '4xl': cls.size_4xl,
  '5xl': cls.size_5xl,
  '6xl': cls.size_6xl,
  '7xl': cls.size_7xl,
  '8xl': cls.size_8xl,
}

interface ITextProps {
  tag?: TextTag
  weight?: TextWeight
  size?: TextSize
  color?: TextColor
  style?: CSSProperties
  hideOverflow?: boolean
  breakAll?: boolean
  link?: boolean
  className?: string
}

export { type ITextProps, cls, sizeStyle, weightStyle, colorStyle }
