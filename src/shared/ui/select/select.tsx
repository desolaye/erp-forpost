import { forwardRef } from 'react'
import ReactSelect from 'react-select'
import { Text } from '../text'

type SelectProps = {
  options: { value: string | number; label: string }[]
  defaultValue?: { value: string | number; label: string }[]
  onChange: (...event: any[]) => void
  name?: string

  onSearch?: (val: string) => void

  placeholder?: string
  errorMsg?: string
  label?: string

  value?: { value: string | number; label: string }
  disabled?: boolean
  isClearable?: boolean
  isMulti?: boolean
  className?: string
}

export const Select = forwardRef<any, SelectProps>((props, ref) => {
  const {
    errorMsg,
    label,
    placeholder,
    value,
    onSearch,
    isClearable,
    className,
    ...rest
  } = props

  return (
    <section
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      {label && <Text>{label}</Text>}

      <ReactSelect
        {...rest}
        ref={ref}
        className={className}
        onInputChange={onSearch}
        placeholder={placeholder}
        value={value}
        isClearable={isClearable}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: `1px solid ${errorMsg ? '#830000' : 'grey'}`,
            ':hover': {
              border: `1px solid ${errorMsg ? '#830000' : '#269ad4'}`,
            },
            ':focus': {
              border: `1px solid ${errorMsg ? '#830000' : '#269ad4'}`,
            },
          }),
        }}
      />

      {errorMsg && (
        <Text size="sm" color="error">
          {errorMsg}
        </Text>
      )}
    </section>
  )
})
