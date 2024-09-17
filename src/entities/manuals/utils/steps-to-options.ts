import { StepType } from '../model/step.schema'

export const stepsToOptions = (steps?: StepType[]) => {
  return !steps
    ? []
    : steps.map((v) => ({
        label: `${v.description || 'Без описания'} - ${v.duration}`,
        value: v.id,
      }))
}
