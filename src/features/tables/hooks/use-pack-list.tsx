import React, { useEffect } from 'react'

import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { useSearch } from '../../../common/hooks/useSearch'
import { formatDate, PATH } from '../../../common/utils'
import { LearnButton, UpdateButtons } from '../components'
import { savePackIdForUpdate, savePackNameForUpdate, toggleUpdatePackModal } from '../packs-reducer'
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
  const dispatch = useAppDispatch()

  const maxCardsCount = response?.data ? response?.data.maxCardsCount : 0
  const minCardsCount = response?.data ? response?.data.minCardsCount : 0
  const emptyParams = {}
  const { setSearchParams, search, searchParams } = useSearch()

  const editItemHandler = (packId: string, name: string) => {
    dispatch(savePackIdForUpdate({ packId }))
    dispatch(savePackNameForUpdate({ name }))
    dispatch(toggleUpdatePackModal({ showModal: true }))
  }

  const rows = response.data?.cardPacks.map(p => {
    const isMyPack = userId === p.user_id

    return {
      key: p._id,
      name: <NavLink to={`${PATH.CARDS}?cardsPack_id=` + p._id}>{p.name}</NavLink>,
      cards: p.cardsCount,
      updated: formatDate(p.updated),
      created: formatDate(p.created),
      author: p.user_name,
      actions: (
        <div style={{ display: 'flex', justifyContent: 'start' }}>
          <LearnButton isCardCount={!!p.cardsCount} />
          <UpdateButtons
            isMyItem={isMyPack}
            editHandler={() => editItemHandler(p._id, p.name)}
            deleteHandler={() => deletePack(p._id)}
          />
        </div>
      ),
    }
  })

  const addNewPack = (name: string, isPrivate: boolean) => {
    addPack({ cardsPack: { name, private: isPrivate } })
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

  useEffect(() => {
    trigger({ ...search })
  }, [searchParams])

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
    rows,
  }
}
