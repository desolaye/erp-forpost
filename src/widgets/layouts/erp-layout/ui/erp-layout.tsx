import { Outlet } from '@tanstack/react-router'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

import { NavMenu } from '@/features/nav-menu'

import { useErpLayout } from '../lib/use-erp-layout'
import { ModalLayout } from '../../modal'

import { SystemDescription } from './components/system-description'
import cls from './erp-layout.module.scss'

export const ErpLayout = () => {
  const { isOpen, setIsOpen } = useErpLayout()

  return (
    <article className={cls.erp_layout}>
      <header className={cls.erp_layout__header}>
        <NavMenu />
        <img style={{ height: 40 }} src="/logo.png" alt="image" />

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
      </header>

      <main className={cls.erp_layout__main}>
        <section className={cls.erp_layout__main__outlet}>
          <Outlet />
        </section>
      </main>

      <ModalLayout onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <SystemDescription onClose={() => setIsOpen(false)} />
      </ModalLayout>
    </article>
  )
}
