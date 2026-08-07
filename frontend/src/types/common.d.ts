export type HttpError = {
  message: string
  statusCode: number
  error: string
}

export type ListResponse<T> = {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
