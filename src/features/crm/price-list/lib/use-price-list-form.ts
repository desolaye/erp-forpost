import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PriceListValidatorType, ZPriceListValidator } from '@/entities/crm/price-list'

interface IUseWarehouseForm {
  priceList?: PriceListValidatorType
  onMutate: (data: PriceListValidatorType) => void
  onClose?: () => void
}

export const usePriceListFormForm = (props: IUseWarehouseForm) => {
  const { priceList, onMutate, onClose } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PriceListValidatorType>({
    resolver: zodResolver(ZPriceListValidator),
    // defaultValues: priceList,
  })

  const onSubmit: SubmitHandler<PriceListValidatorType> = onMutate
  const onReset = onClose

  return {
    handleSubmit,
    register,
    onSubmit,
    onReset,
    errors,
    control,
  }
}
