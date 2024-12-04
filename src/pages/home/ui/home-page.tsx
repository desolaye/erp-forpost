import { NotificationsList } from '@/features/notifications'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'

const HomePage = () => {
  return (
    <PageWrapper title="Главная страница">
      <NotificationsList />
    </PageWrapper>
  )
}

export default HomePage
