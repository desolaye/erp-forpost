import { useState } from 'react'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { ModalLayout } from '@/shared/ui/modal-layout'

import { SystemDescription } from '@/features/system-description'

export const AboutAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        mode="neutral"
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          padding: '2px 4px',
        }}
        onClick={() => setIsOpen(true)}
      >
        <HelpOutlineOutlinedIcon style={{ width: 24, height: 24 }} />
        <Text>О приложении</Text>
      </Button>

      <ModalLayout onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <SystemDescription />
      </ModalLayout>
    </>
  )
}
