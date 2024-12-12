import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import { useMemo, useState } from 'react'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Select } from '@/shared/ui/select'

import { ProductAttributeType } from '../model/product-attributes.schema'

type ProductAttributeProps = {
  attribute: ProductAttributeType
  isOpen: boolean
  attrOptions: { label: string; value: string }[]
  onOpen: () => void
  onDelete?: (id: string) => void
  onDeleteValue?: (props: { values: string[]; productAttrId: string }) => void
  onAddValue?: (props: { values: string[]; productAttrId: string }) => void
}

export const ProductAttribute = (props: ProductAttributeProps) => {
  const { attribute, isOpen, attrOptions, onOpen, onDelete, onDeleteValue, onAddValue } =
    props

  const filteredOptions = useMemo(() => {
    return attrOptions.filter(
      (v) => attribute.values.findIndex((k) => k === v.value) === -1,
    )
  }, [attrOptions, attribute])

  const [isAddingValue, setIsAddingValue] = useState(false)
  const [currentValue, setCurrentValue] = useState({
    label: 'Выберите значение',
    value: '',
  })

  return (
    <Card>
      <header
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button mode="neutral" style={{ padding: '2px 4px' }} onClick={onOpen}>
          <ExpandMoreIcon
            style={{
              transition: '0.2s ease all',
              rotate: isOpen ? '180deg' : undefined,
              width: 24,
              height: 24,
            }}
          />
        </Button>
        <Text weight="semi">{attribute.attributeName}</Text>
        <Button
          mode="secondary"
          style={{ padding: '2px 4px' }}
          onClick={() => onDelete?.(attribute.id)}
        >
          <DeleteOutlineOutlinedIcon
            style={{
              width: 24,
              height: 24,
            }}
          />
        </Button>
      </header>

      {isOpen && (
        <main
          style={{
            display: 'flex',
            gap: 8,
            paddingTop: 8,
            flexDirection: 'column',
            borderTop: '1px solid #999',
          }}
        >
          {!isAddingValue && (
            <Button mode="secondary" onClick={() => setIsAddingValue(true)}>
              + Добавить значение
            </Button>
          )}

          {isAddingValue && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Select
                className="full"
                value={currentValue}
                options={filteredOptions}
                onChange={setCurrentValue}
              />
              <Button
                mode="neutral"
                style={{ padding: '2px 4px' }}
                onClick={() =>
                  onAddValue?.({
                    values: [...attribute.values, currentValue.value],
                    productAttrId: attribute.id,
                  })
                }
              >
                <EditNoteOutlinedIcon
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </Button>
              <Button
                mode="secondary"
                style={{ padding: '2px 4px' }}
                onClick={() => setIsAddingValue(false)}
              >
                <DeleteOutlineOutlinedIcon
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </Button>
            </div>
          )}

          {attribute.values.map((v) => (
            <div
              key={v}
              style={{
                display: 'flex',
                gap: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{v}</Text>
              <Button
                mode="secondary"
                style={{ padding: '2px 4px' }}
                onClick={() =>
                  onDeleteValue?.({
                    values: attribute.values.filter((attr) => attr !== v),
                    productAttrId: attribute.id,
                  })
                }
              >
                <DeleteOutlineOutlinedIcon
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </Button>
            </div>
          ))}
        </main>
      )}
    </Card>
  )
}
