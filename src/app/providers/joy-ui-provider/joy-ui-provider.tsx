import { PropsWithChildren } from 'react'
import {
  extendTheme as materialExtendTheme,
  CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles'
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/material/CssBaseline'

export const JoyUiProvider = (props: PropsWithChildren) => {
  const { children } = props
  const materialTheme = materialExtendTheme()

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />
        {children}
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  )
}
