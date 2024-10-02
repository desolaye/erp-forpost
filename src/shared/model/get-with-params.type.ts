export type GetWithParamsType = {
  params: {
    skip: number
    limit: number
  }
  filters?: {
    filterExpression: string
    filterValues: string
  }
}
