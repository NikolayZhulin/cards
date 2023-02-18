import React, { useEffect, useState } from 'react'

import { Checkbox, Input } from 'antd'

import { Preloader } from '../../../../../common/components'
import { ModalFC } from '../../../../../common/components/modal/ModalFC'
import { PaginationFC } from '../../../../../common/components/pagination/PaginationFC'
import { columnsForPacks } from '../../../helpers'
import { usePackList } from '../../../hooks'

import { PackListMiddleSection } from './PackListMiddleSection'
import { ListTable } from './PackListTable'
import { PackListTopSection } from './PackListTopSection'

export const PacksListBlocks = () => {
  const {
    addNewPack,
    getAllPacks,
    getMyPacks,
    maxCardsCount,
    minCardsCount,
    onChangePaginationHandler,
    response,
    search,
    rows,
    packIsAdding,
  } = usePackList()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [name, setName] = useState<string>('new name')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)

  const closeModal = () => {
    setName('')
    setOpenModal(false)
  }
  const addNewPackHandler = () => addNewPack(name, isPrivate)

  useEffect(() => {
    closeModal()
  }, [response])

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
        <>
          <Input
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            placeholder="Name pack"
            bordered={false}
          />
          <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
        </>
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
