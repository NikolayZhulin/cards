import React, { useState } from 'react'

import { Checkbox, Input } from 'antd'

import { Preloader } from '../../../../../common/components'
import { ModalFC } from '../../../../../common/components/modal/ModalFC'
import { PaginationFC } from '../../../../../common/components/pagination/PaginationFC'
import { columnsForPacks } from '../../../helpers'
import { usePackList } from '../../../hooks'
import { useAddPackMutation } from '../../../tablesApi'

import { PackListMiddleSection } from './PackListMiddleSection'
import { ListTable } from './PackListTable'
import { PackListTopSection } from './PackListTopSection'

export const PacksListBlocks = () => {
  const {
    getAllPacks,
    getMyPacks,
    maxCardsCount,
    minCardsCount,
    onChangePaginationHandler,
    response,
    search,
    rows,
  } = usePackList()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [addPack, { isLoading: packIsAdding }] = useAddPackMutation()

  const closeModal = () => {
    setName('')
    setOpenModal(false)
  }
  const addNewPackHandler = async () => {
    try {
      await addPack({ cardsPack: { name, private: isPrivate } }).unwrap()
      closeModal()
    } catch (e) {
      console.log(e)
    }
  }

  if (response.isLoading) return <Preloader />

  return (
    <>
      <ModalFC
        okText={'Save'}
        danger={false}
        isOpen={openModal}
        isLoading={packIsAdding}
        handleOk={addNewPackHandler}
        handleCancel={closeModal}
      >
        <div>
          <h3>Add new pack</h3>
          <hr />
          <div>Name pack</div>
          <Input
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            placeholder="Enter name"
            bordered={false}
            autoFocus={true}
          />
          <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}>
            Private pack
          </Checkbox>
        </div>
      </ModalFC>
      <PackListTopSection
        formTitle={'Pack list'}
        addNewItem={() => {
          setOpenModal(true)
        }}
      />
      <PackListMiddleSection
        getMyPacks={getMyPacks}
        getAllPacks={getAllPacks}
        maxCardsCount={maxCardsCount}
        minCardsCount={minCardsCount}
        min={+search.min}
        max={+search.max}
      />
      <ListTable {...{ name: 'Packs', columns: columnsForPacks, sortType: 'sortPacks', rows }} />
      <PaginationFC
        current={response.data?.page}
        pageSize={response.data?.pageCount}
        total={response.data?.cardPacksTotalCount}
        onChange={onChangePaginationHandler}
      />
    </>
  )
}
