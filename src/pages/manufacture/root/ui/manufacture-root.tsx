import { Link } from '@tanstack/react-router'

import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'

import { PageWrapper } from '@/widgets/layouts/page-wrapper'
import { manufactureRoutes } from '../utils/manufacture-routes'

export const ManufactureRoot = () => {
  return (
    <PageWrapper>
      <Card>
        <Text size="xl" weight="medium">
          Панель производства:
        </Text>
        {manufactureRoutes.map((v) => (
          <Link to={v.route} key={v.route}>
            <Text link color="primary">
              {v.title}
            </Text>
          </Link>
        ))}
      </Card>
    </PageWrapper>
  )
}
