import { createTheme, ThemeProvider } from '@mui/material'
import { PropsWithChildren } from 'react'

export const MyThemeProvider = (props: PropsWithChildren) => {
  const { children } = props

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #eee',
            boxShadow:
              '0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.15)',
            color: 'black',
            fontSize: '16px',
            fontFamily: '"Montserrat", sans-serif',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: '#830000',
            },
            '&.MuiTab-root': {
              fontFamily: '"Montserrat", sans-serif',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: '#830000',
          },
        },
      },
      MuiPopper: {
        styleOverrides: {
          root: {
            '&.MuiPopper-root': {
              fontFamily: '"Montserrat", sans-serif',
            },
          },
        },
      },
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
