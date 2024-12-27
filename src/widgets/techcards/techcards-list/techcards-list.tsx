import { Pagination } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import { Loader } from '@/shared/ui/loader'
import { EmptyCard } from '@/shared/ui/empty-card'
import { Card } from '@/shared/ui/card'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import { TechcardsAllResponseType } from '@/entities/manuals/techcards'

import cls from './techcards-list.module.scss'

type TechcardsListProps = {
  pagination?: {
    count: number
    page: number
    onSetPage: (page: number) => void
  }
  isLoading?: boolean
  techcards?: TechcardsAllResponseType['items']
  search?: string
  onCreate?: () => void
  onCardSelect?: (cardId: string) => void
  onSearch?: (val: string) => void
}

export const TechcardsList = (props: TechcardsListProps) => {
  const { pagination, isLoading, techcards, search, onSearch, onCardSelect, onCreate } =
    props

  return (
    <nav className={cls.techcards_list__nav}>
      <Card style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <Input
          placeholder="Поиск по номеру"
          full
          value={search}
          onChange={(e) => onSearch?.(e.target.value)}
          style={{ minWidth: 0 }}
        />
        <Button
          full
          mode="secondary"
          onClick={onCreate}
          style={{ width: 32, height: 32, padding: 4 }}
        >
          <AddOutlinedIcon style={{ width: 20, height: 20 }} />
        </Button>
      </Card>

      <div className={cls.techcards_list__list}>
        {isLoading && <Loader />}

        {!isLoading && !Boolean(techcards?.length) && <EmptyCard />}

        {!isLoading &&
          techcards?.map((v) => (
            <Card
              key={v.id}
              className={cls.techcards_list__card}
              onClick={() => onCardSelect?.(v.id)}
            >
              <Text weight="semi">{v.number}</Text>
              <Text breakAll>{v.productName}</Text>
            </Card>
          ))}
      </div>

      <Pagination
        page={pagination?.page}
        onChange={(_, p) => pagination?.onSetPage(p)}
        count={pagination?.count}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </nav>
  )
}
