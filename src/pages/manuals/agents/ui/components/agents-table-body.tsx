import { AgentType } from '@/entities/manuals'
import { Button } from '@/shared/ui/button'
import { EmptyCard } from '@/shared/ui/empty-card'

interface IAgentsTableBodyProps {
  data?: AgentType[]
  onModal?: (id: string) => void
}

export const AgentsTableBody = (props: IAgentsTableBodyProps) => {
  const { data, onModal } = props

  const handleModal = (id: string) => {
    if (onModal) onModal(id)
  }

  if (!data) return <EmptyCard />

  return data.map((v) => (
    <Button key={v.id} mode="table" onClick={() => handleModal(v.id)}>
      {v.name}
    </Button>
  ))
}
