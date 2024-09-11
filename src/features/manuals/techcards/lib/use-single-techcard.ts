import { useQuery } from '@tanstack/react-query'

import { getTechcardFull, TechcardFullType } from '@/entities/manuals'

export const useSingleTechcard = (id: string) => {
  const testCard: TechcardFullType = {
    id: '9f44a641-b377-48a1-9988-e3cfcc653968',
    number: 'ТК-001',
    description: null,
    steps: [
      {
        techCardId: '9f44a641-b377-48a1-9988-e3cfcc653968',
        operationName: 'Набор',
        description: 'Набор компонентов для разработки',
        duration: '01:30:00',
        cost: 400,
        unitOfMeasure: 1,
      },
      {
        techCardId: '9f44a641-b377-48a1-9988-e3cfcc653968',
        operationName: 'Сборка',
        description: null,
        duration: '03:30:00',
        cost: 780,
        unitOfMeasure: 1,
      },
      {
        techCardId: '9f44a641-b377-48a1-9988-e3cfcc653968',
        operationName: 'Настройка',
        description: null,
        duration: '03:05:00',
        cost: 330,
        unitOfMeasure: 1,
      },
      {
        techCardId: '9f44a641-b377-48a1-9988-e3cfcc653968',
        operationName: 'Прогон',
        description: null,
        duration: '00:30:00',
        cost: 1850,
        unitOfMeasure: 1,
      },
      {
        techCardId: '9f44a641-b377-48a1-9988-e3cfcc653968',
        operationName: 'Упаковка',
        description: null,
        duration: '01:10:00',
        cost: 620,
        unitOfMeasure: 1,
      },
      {
        techCardId: '9f44a641-b377-48a1-9988-e3cfcc653968',
        operationName: 'Отгрузка',
        description: null,
        duration: '02:38:00',
        cost: 563,
        unitOfMeasure: 1,
      },
    ],
    items: [
      {
        techCardId: '9f44a641-b377-48a1-9988-e3cfcc653968',
        productId: 'ae3c94b5-77a1-4548-ac65-e158345448bd',
        productName: 'Плата диодов FOUT5000_220JYPv3',
        quantity: 3,
      },
      {
        techCardId: '9f44a641-b377-48a1-9988-e3cfcc653968',
        productId: 'b88a2b64-2938-4ab6-aa6e-329ddac9c53c',
        productName: 'Плата ключей БПС3000.14.1ф.ПТ-v1',
        quantity: 1,
      },
      {
        techCardId: '9f44a641-b377-48a1-9988-e3cfcc653968',
        productId: '8587d06c-deb3-45ba-8a5b-98406f7a18cf',
        productName: 'Радиатор БПС5000.23',
        quantity: 1,
      },
    ],
  }

  const { data: techcard, isPending } = useQuery({
    queryFn: () => getTechcardFull(id),
    queryKey: ['techcard_full', id],
  })

  return {
    values: {
      data: techcard?.data || testCard,
      id,
      isPending,
    },
  }
}
