import { ErrorCategory, ErrorCode } from '#imports'

export interface ApiError {
  category: ErrorCategory,
  detail?: string | string[],
  message: string,
  statusCode: number,
  type?: ErrorCode
}
