import { useEffect } from 'react'

import { useAppSelector } from '../../../common/hooks/reduxHooks'
import { useSearch } from '../../../common/hooks/useSearch'
import {
  useAddPackMutation,
  useDeletePackMutation,
  useLazyFetchCardsPackQuery,
  useUpdatePackMutation,
} from '../tablesApi'

export const usePackList = () => {
  const userId = useAppSelector(state => state.auth.userId)

  const [addPack, {}] = useAddPackMutation()
  const [updatePack, {}] = useUpdatePackMutation()
  const [deletePack, {}] = useDeletePackMutation()
  const [trigger, response] = useLazyFetchCardsPackQuery()

  const maxCardsCount = response?.data ? response?.data.maxCardsCount : 0
  const minCardsCount = response?.data ? response?.data.minCardsCount : 0
  const emptyParams = {}
  const { setSearchParams, search, searchParams } = useSearch()

  useEffect(() => {
    trigger({ ...search })
  }, [searchParams])

  const addNewPack = () => {
    addPack({})
  }
  const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
    setSearchParams({ ...search, page: newPage.toString(), pageCount: newPageCount.toString() })
  }
  const getMyPacks = () => {
    setSearchParams(prevState => ({ ...prevState, ...emptyParams, user_id: userId }))
  }
  const getAllPacks = () => {
    setSearchParams(prevState => ({ ...prevState, ...emptyParams }))
  }

  return {
    addNewPack,
    deletePack,
    getAllPacks,
    getMyPacks,
    updatePack,
    maxCardsCount,
    minCardsCount,
    onChangePaginationHandler,
    response,
    search,
  }
}
