import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { TechcardStepType } from '@/entities/manuals'

export const getDisplayValuesSteps = () => {
  const config: TableRowRecordType<TechcardStepType> = {
    operationName: {
      width: 150,
      title: 'Название',
      type: 'text',
    },
    cost: {
      width: 100,
      title: 'Стоимость',
      type: 'text',
    },
    duration: {
      width: 150,
      title: 'Длительность',
      type: 'text',
    },
    unitOfMeasure: {
      width: 100,
      title: 'Меры',
      type: 'text',
    },
    description: {
      width: 250,
      maxWidth: 250,
      title: 'Описание',
      type: 'text',
    },
    techCardId: {
      width: 0,
      title: '',
      type: 'text',
    },
    id: {
      width: 0,
      title: '',
      type: 'text',
    },
    productCompositionSettingFlag: {
      width: 0,
      title: '',
      type: 'text',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<TechcardStepType>
}
