import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'

import { PriceListDetailed, usePriceListPage } from '@/features/crm/price-list'
import { PageWrapper } from '@/widgets/layouts/page-wrapper'
import { ModalLayout } from '@/widgets/layouts/modal'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'
import { priceListTableConfig } from '../utils/price-list-table-config'

const PriceListPage = () => {
  const { handlers, values } = usePriceListPage()
  const config = priceListTableConfig()

  return (
    <PageWrapper title="Прайс-лист">
      <Card style={{ flexDirection: 'row' }}>
        <Input
          full
          placeholder="Поиск"
          value={values.search}
          onChange={(e) => handlers.setSearch(e.target.value)}
        />
        <Button onClick={() => handlers.setIsModalOpen(true)}>Создать прайс</Button>
      </Card>

      <SmartTable
        config={config}
        currentPage={values.page}
        onPageChange={handlers.setPage}
        pageCount={values.totalPages}
      >
        {values.data?.map((row) => (
          <SmartTableRow key={row.id} config={config} row={row} />
        ))}
      </SmartTable>

      <ModalLayout isOpen={values.isModalOpen} onClose={handlers.setModal}>
        <PriceListDetailed
          onMutate={handlers.mutateAsync}
          priceList={values.selectedPriceList}
          onClose={handlers.setModal}
        />
      </ModalLayout>
    </PageWrapper>
  )
}

export default PriceListPage
