import React, { useState } from 'react'

import { Preloader } from '../../../../../common/components'
import { PaginationFC } from '../../../../../common/components/pagination/PaginationFC'
import { AddNewPackModal } from '../../../components/AddNewPackModal'
import { columnsForPacks } from '../../../helpers'
import { usePackList } from '../../../hooks'

import { PackListMiddleSection } from './PackListMiddleSection'
import { PackListTable } from './PackListTable'
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
  const [showModal, setShowModal] = useState<boolean>(false)
  const addNewItemHandler = () => {
    setShowModal(true)
  }
  const hideModal = () => setShowModal(false)

  if (response.isLoading) return <Preloader />

  return (
    <>
      {showModal && <AddNewPackModal hideModal={hideModal} />}
      <PackListTopSection formTitle={'Pack list'} addNewItem={addNewItemHandler} />
      <PackListMiddleSection
        getMyPacks={getMyPacks}
        getAllPacks={getAllPacks}
        maxCardsCount={maxCardsCount}
        minCardsCount={minCardsCount}
        min={+search.min}
        max={+search.max}
      />
      <PackListTable
        {...{ name: 'Packs', columns: columnsForPacks, sortType: 'sortPacks', rows }}
      />
      <PaginationFC
        current={response.data?.page}
        pageSize={response.data?.pageCount}
        total={response.data?.cardPacksTotalCount}
        onChange={onChangePaginationHandler}
      />
    </>
  )
}
