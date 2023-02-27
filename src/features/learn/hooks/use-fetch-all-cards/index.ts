import { useEffect } from 'react'

import { useAppDispatch } from '../../../../common/hooks/reduxHooks'
import { useLazyFetchAllCardsQuery } from '../../api'
import { clearAllState } from '../../slice'

export const useFetchAllCards = (id: string, chooseRandomCard: () => void) => {
  const [fetchCards, { isLoading, data, isFetching }] = useLazyFetchAllCardsQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const asyncFecth = async () => {
      await fetchCards({
        cardsPack_id: id,
        pageCount: 100,
      })

      if (data && data.cardsTotalCount > data.pageCount) {
        const fetchQty = Math.ceil(data.cardsTotalCount / data.pageCount) - 1

        for (let i = 0; i < fetchQty; i++) {
          await fetchCards({
            cardsPack_id: id,
            pageCount: 100,
            page: i + 2,
          })
        }
      }
      chooseRandomCard()
    }

    asyncFecth()

    return () => {
      console.log('unmount')
      dispatch(clearAllState())
    }
  }, [isLoading])

  return { isLoading, isFetching }
}
