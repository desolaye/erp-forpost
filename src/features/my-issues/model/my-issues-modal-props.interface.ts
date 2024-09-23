import { StaffResponseType } from '@/entities/manuals'

export interface IMyIssuesModalProps {
  issueId: string
  onClose?: () => void
  staff?: StaffResponseType['employees']
  defaultValue: {
    value: string
    label: string
  }
}
