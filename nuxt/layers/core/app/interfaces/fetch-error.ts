export interface FetchError {
  category: ErrorCategory,
  detail?: string | string[],
  message: string,
  statusCode: number,
  type?: ErrorCode
}
