import { Checkbox } from '@mui/material'
import { useState } from 'react'

interface ICheckboxRowProps {
  onCheck?: () => void
}

export const CheckboxRow = (props: ICheckboxRowProps) => {
  const { onCheck } = props
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    setChecked((prev) => !prev)
    onCheck?.()
  }

  if (!onCheck) return null

  return (
    <Checkbox
      checked={checked}
      onChange={handleClick}
      style={{ padding: 0, minWidth: 28 }}
    />
  )
}
