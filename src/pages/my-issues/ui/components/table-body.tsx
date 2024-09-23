import { useRef, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { EmptyCard } from '@/shared/ui/empty-card'

import { MyIssueResponseType, MyIssueType } from '@/entities/my-issues'
import { StaffResponseType } from '@/entities/manuals'

import { SelectExecutor } from '@/features/my-issues'
import { ModalLayout } from '@/widgets/layouts/modal'

import { myIssuesTableConfig } from '../../utils/my-issues-table.config'

interface ITableBodyProps {
  tab: 'executor' | 'responsible'
  data?: MyIssueResponseType['issues']
  staff?: StaffResponseType['employees']
}

type ModalExecutorType = {
  executorId: string
  executorName: string
  issueId: string
} | null

export const TableBody = (props: ITableBodyProps) => {
  const { data, staff, tab } = props
  const config = myIssuesTableConfig(tab)

  const [menuOpen, setMenuOpen] = useState(false)
  const [modalData, setModalData] = useState<ModalExecutorType>(null)
  const anchor = useRef<null | HTMLButtonElement>(null)

  const handleOpenMenu = (issue: MyIssueType) => {
    setModalData({
      executorId: issue.executorId,
      executorName: issue.executorName || '',
      issueId: issue.id,
    })
    setMenuOpen(false)
  }

  if (!data || !data.length) return <EmptyCard />

  return data.map((issue) => (
    <div key={issue.id} style={{ display: 'flex', gap: 8, width: '100%' }}>
      <Button mode="table" style={{ display: 'flex', gap: 8, width: '100%' }}>
        {config.map(([key, value]) => (
          <Text key={key} style={{ width: value.size }} hideOverflow>
            {issue[key]}
          </Text>
        ))}
      </Button>

      {tab === 'responsible' && (
        <div>
          <Button ref={anchor} mode="secondary" circle onClick={() => setMenuOpen(true)}>
            <MoreVertOutlinedIcon />
          </Button>
          <Menu
            anchorEl={anchor.current}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          >
            <MenuItem
              onClick={() => {
                handleOpenMenu(issue)
              }}
            >
              Назначить исполнителя
            </MenuItem>
          </Menu>
        </div>
      )}

      <ModalLayout isOpen={Boolean(modalData)} onClose={() => setModalData(null)} center>
        <SelectExecutor
          onClose={() => setModalData(null)}
          defaultValue={{
            label: modalData?.executorName || '',
            value: modalData?.executorId || '',
          }}
          issueId={modalData?.issueId || ''}
          staff={staff}
        />
      </ModalLayout>
    </div>
  ))
}
