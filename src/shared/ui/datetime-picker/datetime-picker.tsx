import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import dayjs from 'dayjs'
import { forwardRef } from 'react'

import { Text } from '../text'

type DatetimePickerProps = {
  onChange?: (...event: any[]) => void
  name?: string
  value?: string

  errorMsg?: string
  label?: string
}

export const DatetimePicker = forwardRef<any, DatetimePickerProps>((props, ref) => {
  const { errorMsg, label, ...rest } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      {label && <Text>{label}</Text>}

      <DateTimePicker
        {...rest}
        ref={ref}
        onChange={(v) => rest.onChange?.(dayjs(v).toISOString())}
        defaultValue={null}
        value={dayjs(rest.value)}
      />

      {errorMsg && (
        <Text size="sm" color="error">
          {errorMsg}
        </Text>
      )}
    </LocalizationProvider>
  )
})
