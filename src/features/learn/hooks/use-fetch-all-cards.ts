import { useEffect } from 'react'

import { useAppDispatch } from '../../../common/hooks/reduxHooks'
import { clearAllState } from '../learn-reducer'
import { useLazyFetchAllCardsQuery } from '../learnApi'

export const useFetchAllCards = (id: string, chooseRandomCard: () => void) => {
  const [fetchCards, { isLoading, data }] = useLazyFetchAllCardsQuery()

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
      dispatch(clearAllState())
    }
  }, [isLoading])

  return { isLoading }
}
