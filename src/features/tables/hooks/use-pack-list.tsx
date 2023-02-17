import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../../common/hooks/reduxHooks'
import { useSearch } from '../../../common/hooks/useSearch'
import { formatDate, PATH } from '../../../common/utils'
import { LearnButton, UpdateButtons } from '../components'
import { PackListDataType } from '../helpers'
import {
  useAddPackMutation,
  useDeletePackMutation,
  useLazyFetchCardsPackQuery,
  useUpdatePackMutation,
} from '../tablesApi'

export const usePackList = () => {
  const userId = useAppSelector(state => state.auth.userId)
  const [rows, setRows] = useState<PackListDataType[]>()

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

  useEffect(() => {
    if (response && response.data) {
      const { cardPacks } = response.data
      let rows: PackListDataType[] = []

      cardPacks.forEach(p => {
        const isMyPack = userId === p.user_id

        rows.push({
          key: p._id,
          name: <NavLink to={`${PATH.CARDS}?cardsPack_id=` + p._id}>{p.name}</NavLink>,
          cards: p.cardsCount,
          updated: formatDate(p.updated),
          created: formatDate(p.created),
          actions: (
            <div style={{ display: 'flex', justifyContent: 'start' }}>
              <LearnButton isCardCount={!!p.cardsCount} />
              <UpdateButtons
                isMyItem={isMyPack}
                editHandler={() => updatePack(p._id)}
                deleteHandler={() => deletePack(p._id)}
              />
            </div>
          ),
        })
      })
      setRows(rows)
    }
  }, [response])

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
    rows,
  }
}
