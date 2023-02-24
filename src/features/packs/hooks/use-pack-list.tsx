import React, { useEffect } from 'react'

import { show } from '@ebay/nice-modal-react'
import { NavLink } from 'react-router-dom'

import { LearnButton } from '../../../common/components/learn-buttons/LearnButton'
import { UpdateButtons } from '../../../common/components/update-buttons/UpdateButtons'
import { useAppSelector } from '../../../common/hooks/reduxHooks'
import { useSearch } from '../../../common/hooks/useSearch'
import { formatDate, PATH } from '../../../common/utils'
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

  const maxCardsCount = response?.data ? response?.data.maxCardsCount : 0
  const minCardsCount = response?.data ? response?.data.minCardsCount : 0
  const emptyParams = {}
  const { setSearchParams, search, searchParams } = useSearch()

  useEffect(() => {
    trigger({ ...search })
  }, [searchParams])

  const editPackHandler = (packId: string, name: string) => {
    show('update-pack-modal', { cardsPack_id: packId, prevName: name })
  }
  const deletePackHandler = (packId: string, name: string) => {
    show('delete-pack-modal', { cardsPack_id: packId, packName: name })
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
