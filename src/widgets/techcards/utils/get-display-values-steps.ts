import { TechcardStepType } from '@/entities/manuals'

export const getDisplayValuesSteps = () => {
  type DisplayValues = [
    keyof TechcardStepType,
    {
      size: string
      title: string
    },
  ][]

  const config: Record<keyof TechcardStepType, { size: string; title: string }> = {
    operationName: {
      size: '150px',
      title: 'Название',
    },
    cost: {
      size: '100px',
      title: 'Стоимость',
    },
    duration: {
      size: '150px',
      title: 'Длительность',
    },
    unitOfMeasure: {
      size: '100px',
      title: 'Меры',
    },
    description: {
      size: '250px',
      title: 'Описание',
    },
    techCardId: {
      size: '0',
      title: '',
    },
    id: {
      size: '0',
      title: '',
    },
    productCompositionSettingFlag: {
      size: '0',
      title: '',
    },
  }

  const getDisplayValues = () => {
    return Object.entries(config).filter(
      ([_, value]) => value.size !== '0',
    ) as DisplayValues
  }

  return getDisplayValues()
}
