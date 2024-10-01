import { PropsWithChildren, Suspense } from 'react'
import { AppLoader } from '@/shared/ui/app-loader'

export const SuspenseProvider = (props: PropsWithChildren) => {
  const { children } = props

  return <Suspense fallback={<AppLoader />}>{children}</Suspense>
}
