import { Link } from '@tanstack/react-router'
import { MouseEvent, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { EmptyCard } from '@/shared/ui/empty-card'
import { routesPath } from '@/shared/config/routes-path.config'

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

  const [anchor, setAnchor] = useState<null | HTMLButtonElement>(null)
  const [modalData, setModalData] = useState<ModalExecutorType>(null)
  const { root, proddevIssue } = routesPath.erp.manufacture

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>, issue: MyIssueType) => {
    setAnchor(e.currentTarget)

    setModalData({
      executorId: issue.executorId,
      executorName: issue.executorName || '',
      issueId: issue.id,
    })
  }

  if (!data || !data.length) return <EmptyCard />

  return (
    <>
      {data.map((issue) => (
        <div key={issue.id} style={{ display: 'flex', gap: 8, width: '100%' }}>
          <Link to={proddevIssue(root(), issue.id)} style={{ width: '100%' }}>
            <Button mode="table" style={{ display: 'flex', gap: 8, width: '100%' }}>
              {config.map(([key, value]) => (
                <Text key={key} style={{ width: value.size }} hideOverflow>
                  {issue[key]}
                </Text>
              ))}
            </Button>
          </Link>

          {tab === 'responsible' && (
            <Button mode="secondary" circle onClick={(e) => handleOpenMenu(e, issue)}>
              <MoreVertOutlinedIcon />
            </Button>
          )}
        </div>
      ))}

      <ModalLayout
        isOpen={Boolean(modalData) && !anchor}
        onClose={() => setModalData(null)}
        center
      >
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

      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem onClick={() => setAnchor(null)}>Назначить исполнителя</MenuItem>
      </Menu>
    </>
  )
}
