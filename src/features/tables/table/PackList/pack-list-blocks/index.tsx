import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { Preloader } from '../../../../../common/components'
import { PaginationFC } from '../../../../../common/components/pagination/PaginationFC'
import { useAppSelector } from '../../../../../common/hooks/hooks'
import { PATH } from '../../../../../common/utils/path'
import { formatDate } from '../../../../../common/utils/SetFormatDate'
import { LearnButton } from '../../../components/LearnButton'
import { UpdateButtons } from '../../../components/UpdateButtons'
import { PackListDataType } from '../../../helpers/dataForTables'
import { usePackList } from '../hooks/use-pack-list'

import { PackListMiddleSection } from './PackListMiddleSection'
import { ListTable } from './PackListTable'
import { PackListTopSection } from './PackListTopSection'

export const PacksListBlocks = () => {
  const userId = useAppSelector(state => state.auth.userId)
  const [rows, setRows] = useState<PackListDataType[]>()

  const {
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
  } = usePackList()

  useEffect(() => {
    if (response && response.data) {
      const { cardPacks } = response.data
      let rows: PackListDataType[] = []

      cardPacks.forEach(p => {
        const isMyPack = userId === p.user_id

        rows.push({
          key: p._id,
          name: (
            <NavLink to={`${PATH.FULL_PACK}?cardsPack_id=` + p._id}>
              {p.name}
              {/*${p._id}*/}
            </NavLink>
          ),
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

  if (response.isLoading) return <Preloader />

  return (
    <>
      <PackListTopSection formTitle={'Pack list'} addNewItem={addNewPack} />
      <PackListMiddleSection
        getMyPacks={getMyPacks}
        getAllPacks={getAllPacks}
        maxCardsCount={maxCardsCount}
        minCardsCount={minCardsCount}
        min={+search.min}
        max={+search.max}
      />
      <ListTable rows={rows} type="packs" />
      <PaginationFC
        current={response.data?.page}
        pageSize={response.data?.pageCount}
        total={response.data?.cardPacksTotalCount}
        onChange={onChangePaginationHandler}
      />
    </>
  )
}
