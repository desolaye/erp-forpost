import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'

import { Form } from '@/shared/ui/form'
import { Text } from '@/shared/ui/text'

import { useSelectExecutor } from '../lib/use-select-executor'
import { IMyIssuesModalProps } from '../model/my-issues-modal-props.interface'

export const SelectExecutor = (props: IMyIssuesModalProps) => {
  const { handlers, values } = useSelectExecutor(props)

  return (
    <Form
      withButtons
      onSubmit={handlers.handleSubmit(handlers.submit)}
      onReset={props.onClose}
    >
      <Text weight="medium" size="xl">
        Исполнитель для задачи
      </Text>

      <Controller
        name="executorId"
        control={handlers.control}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={values.users}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: !values.errors.executorId ? 'grey' : '#830000',
              }),
            }}
          />
        )}
      />

      {values.errors.executorId && (
        <Text size="sm" color="error">
          Необходимо выбрать исполнителя
        </Text>
      )}
    </Form>
  )
}
