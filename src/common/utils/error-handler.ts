import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

export const errorHandler = (payload: any) => {
  if (isFetchBaseQueryError(payload)) {
    const error = 'error' in payload ? payload.error : JSON.stringify(payload.data)

    return JSON.parse(error).error
  } else if (isErrorWithMessage(payload)) {
    return 'Unknown Error'
  }
}
