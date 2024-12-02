import { forwardRef } from 'react'
import * as JoyTextarea from '@mui/joy/Textarea'

import { JoyUiProvider } from '@/shared/lib/joy-ui-provider'
import { Text } from '../text'

type TextareaProps = {
  onChange: (...event: any[]) => void
  name?: string
  value?: string

  placeholder?: string
  errorMsg?: string
  label?: string
}

export const Textarea = forwardRef<any, TextareaProps>((props, ref) => {
  const { errorMsg, label, placeholder, value, ...rest } = props

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && <Text>{label}</Text>}

      <JoyUiProvider>
        <JoyTextarea.default
          ref={ref}
          {...rest}
          placeholder={placeholder}
          value={value}
          minRows={4}
          maxRows={4}
          variant="soft"
          sx={{ fontFamily: 'Montserrat' }}
        />
      </JoyUiProvider>

      {errorMsg && (
        <Text size="sm" color="error">
          {errorMsg}
        </Text>
      )}
    </section>
  )
})
