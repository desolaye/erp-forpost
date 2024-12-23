import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Select } from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'
import { Form } from '@/shared/ui/form'

import { useGeneralInfoTab } from './use-general-info-tab'

type GeneralInfoTabProps = {
  cardId?: string
  number?: string
  product?: { value: string; label: string }
  description?: string
}

export const GeneralInfoTab = (props: GeneralInfoTabProps) => {
  const { handlers, values } = useGeneralInfoTab(props)

  return (
    <Form
      pending={values.isPending}
      error={values.isError}
      style={{ height: '100%', display: 'flex', gap: 8, flexDirection: 'column' }}
      onSubmit={handlers.editTechcard}
    >
      <main style={{ flex: 1, display: 'flex', gap: 16, flexDirection: 'column' }}>
        <Input
          label="Номер техкарты"
          value={values.editNumber}
          onChange={(e) => handlers.setEditNumber(e.target.value)}
        />

        <Select
          label="Изготавляемый продукт"
          onChange={(e) => handlers.setSelectedProduct(e)}
          value={values.selectedProduct}
          options={values.products}
          onSearch={(val) => handlers.setSearch(val)}
          isClearable
        />

        <Textarea
          label="Описание техкарты"
          minRows={8}
          maxRows={8}
          value={values.editDescription}
          onChange={(e) => handlers.setEditDescription(e.target.value)}
        />
      </main>

      <Button>Сохранить общую информацию</Button>
    </Form>
  )
}
