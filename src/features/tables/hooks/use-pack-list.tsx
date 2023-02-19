import React, { useEffect, useState } from 'react'

import { Input } from 'antd'
import { NavLink } from 'react-router-dom'

import { ModalFC } from '../../../common/components/modal/ModalFC'
import { useAppSelector } from '../../../common/hooks/reduxHooks'
import { useSearch } from '../../../common/hooks/useSearch'
import { formatDate, PATH } from '../../../common/utils'
import { LearnButton, UpdateButtons } from '../components'
import {
  useAddPackMutation,
  useDeletePackMutation,
  useLazyFetchCardsPackQuery,
  useUpdatePackMutation,
} from '../tablesApi'

export const usePackList = () => {
  const userId = useAppSelector(state => state.auth.userId)

  const [addPack, {}] = useAddPackMutation()
  const [updatePack, { isLoading: packIsUpdating }] = useUpdatePackMutation()
  const [deletePack, {}] = useDeletePackMutation()
  const [trigger, response] = useLazyFetchCardsPackQuery()

  const maxCardsCount = response?.data ? response?.data.maxCardsCount : 0
  const minCardsCount = response?.data ? response?.data.minCardsCount : 0
  const emptyParams = {}
  const { setSearchParams, search, searchParams } = useSearch()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const closeModal = () => {
    setValue('')
    setOpenModal(false)
  }

  const updatePackHandler = async (_id: string) => {
    try {
      await updatePack({ cardsPack: { _id, name: value } }).unwrap()
      closeModal()
    } catch (e) {
      console.log(e)
    }
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
            editHandler={() => setOpenModal(true)}
            deleteHandler={() => deletePack(p._id)}
          />
          <ModalFC
            okText={'Save'}
            danger={false}
            isOpen={openModal}
            isLoading={packIsUpdating}
            handleOk={() => updatePackHandler(p._id)}
            handleCancel={closeModal}
          >
            <div>
              <h3>Edit pack</h3>
              <hr />
              <div>Name pack</div>
              <Input
                value={value}
                onChange={e => setValue(e.currentTarget.value)}
                placeholder="Enter name"
                bordered={false}
              />
            </div>
          </ModalFC>
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
