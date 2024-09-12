import cls from './loader.module.scss'

export const Loader = () => {
  return (
    <div className={cls.loader__wrapper}>
      <div className={cls.loader} />
    </div>
  )
}
