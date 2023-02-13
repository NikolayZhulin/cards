import { isErrorWithMessage, isFetchBaseQueryError } from '../services/helpers'

export const errorHandler = (payload: any) => {
  if (isFetchBaseQueryError(payload)) {
    const error = 'error' in payload ? payload.error : JSON.stringify(payload.data)

    return JSON.parse(error).error
  } else if (isErrorWithMessage(payload)) {
    return 'Unknown Error'
  }
}
