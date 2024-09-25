import { MouseEvent, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import { Button } from '@/shared/ui/button'
import { EmptyCard } from '@/shared/ui/empty-card'
import { routesPath } from '@/shared/config/routes-path.config'
import { TableRow } from '@/shared/ui/table-row'

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
      {data.map((v) => (
        <TableRow
          key={v.id}
          config={config}
          data={v}
          to={proddevIssue(root(), v.id)}
          actions={
            tab === 'responsible' ? (
              <Button mode="secondary" circle onClick={(e) => handleOpenMenu(e, v)}>
                <MoreVertOutlinedIcon />
              </Button>
            ) : null
          }
        />
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
