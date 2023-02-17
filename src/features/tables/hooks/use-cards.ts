import { useEffect } from 'react'

import { useSearch } from '../../../common/hooks/useSearch'
import {
  useAddCardMutation,
  useDeleteCardMutation,
  useLazyFetchCardsQuery,
  useUpdateCardMutation,
} from '../tablesApi'

export const UseCards = () => {
  const [addCard, {}] = useAddCardMutation()
  const [updateCard, {}] = useUpdateCardMutation()
  const [deleteCard, {}] = useDeleteCardMutation()
  const [trigger, response] = useLazyFetchCardsQuery()
  const { search, setSearchParams } = useSearch()

  useEffect(() => {
    trigger({ ...search })
  }, [search.cardsPack_id, search.page, search.pageCount, search.cardQuestion, search.sortCards])

  const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
    setSearchParams({ ...search, page: newPage.toString(), pageCount: newPageCount.toString() })
  }

  return { onChangePaginationHandler, addCard, deleteCard, updateCard, response, search }
}
