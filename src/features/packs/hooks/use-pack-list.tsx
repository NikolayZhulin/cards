import React, { useEffect } from 'react'

import { NavLink } from 'react-router-dom'

import { LearnButton } from '../../../common/components/learn-buttons/LearnButton'
import { UpdateButtons } from '../../../common/components/update-buttons/UpdateButtons'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { useSearch } from '../../../common/hooks/useSearch'
import { formatDate, PATH } from '../../../common/utils'
import {
  savePackForDelete,
  savePackForUpdate,
  toggleDeletePackModal,
  toggleUpdatePackModal,
} from '../packs-reducer'
import {
  useAddPackMutation,
  useDeletePackMutation,
  useLazyFetchCardsPackQuery,
  useUpdatePackMutation,
} from '../packsApi'

export const usePackList = () => {
  const userId = useAppSelector(state => state.auth.userId)

  const [addPack, { isLoading: addPackLoading }] = useAddPackMutation()
  const [updatePack, { isLoading: updatePackLoading }] = useUpdatePackMutation()
  const [deletePack, { isLoading: deletePackLoading }] = useDeletePackMutation()
  const [trigger, response] = useLazyFetchCardsPackQuery()
  const dispatch = useAppDispatch()

  const maxCardsCount = response?.data ? response?.data.maxCardsCount : 0
  const minCardsCount = response?.data ? response?.data.minCardsCount : 0
  const emptyParams = {}
  const { setSearchParams, search, searchParams } = useSearch()

  useEffect(() => {
    trigger({ ...search })
  }, [searchParams])

  const editPackHandler = (packId: string, name: string) => {
    dispatch(savePackForUpdate({ packId, name }))
    dispatch(toggleUpdatePackModal({ showModal: true }))
  }
  const deletePackHandler = (packId: string, name: string) => {
    dispatch(toggleDeletePackModal({ showModal: true }))
    dispatch(savePackForDelete({ packId, name, insidePack: false }))
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
            editHandler={() => editPackHandler(p._id, p.name)}
            deleteHandler={() => deletePackHandler(p._id, p.name)}
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

  const isLoading =
    addPackLoading ||
    updatePackLoading ||
    deletePackLoading ||
    response.isLoading ||
    response.isFetching

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
    isLoading,
  }
}
