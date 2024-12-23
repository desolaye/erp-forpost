import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Select } from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'

import { useTechcardCreator } from './use-techcard-creator'
import { Text } from '@/shared/ui/text'

export const TechcardCreator = () => {
  const { handlers, values } = useTechcardCreator()

  return (
    <Form
      withButtons
      onSubmit={handlers.submitForm}
      onReset={handlers.rejectForm}
      error={values.isError}
      pending={values.isPending}
      style={{ padding: 16 }}
    >
      <Text size="lg" weight="semi">
        Создание новой техкарты
      </Text>
      <Input
        label="Номер техкарты"
        value={values.number}
        onChange={(e) => handlers.setNumber(e.target.value)}
      />

      <Select
        label="Изготавляемый продукт"
        onChange={(e) => handlers.setProduct(e)}
        value={values.product}
        options={values.products}
        onSearch={(val) => handlers.setSearch(val)}
        isClearable
      />

      <Textarea
        label="Описание техкарты"
        minRows={8}
        maxRows={8}
        value={values.description}
        onChange={(e) => handlers.setDescription(e.target.value)}
      />
    </Form>
  )
}
