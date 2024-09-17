import { StaffType, StepType, TechcardType } from '@/entities/manuals'
import { ProcessValidatorType } from '@/entities/manufacture'
import { useProcessForm } from '../../lib/use-process-form'
import { Form } from '@/shared/ui/form'

interface IProcessFormProps {
  staff: StaffType[]
  steps: StepType[]
  techcards: TechcardType[]
  onClose?: () => void
  onMutate?: (data: ProcessValidatorType) => void
}

export const ProcessForm = (props: IProcessFormProps) => {
  const { control, errors, handleSubmit, onReset, onSubmit, register, staff } =
    useProcessForm(props)

  return <Form withButtons onSubmit={handleSubmit(onSubmit)} onReset={onReset}></Form>
}
