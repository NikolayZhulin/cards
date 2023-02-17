import React, { useEffect, useState } from 'react'

import emptyStar from '../../../../../assets/pictures/emptyStar.png'
import fullStar from '../../../../../assets/pictures/fullStar.png'
import halfStar from '../../../../../assets/pictures/halfStar.png'
import { Preloader } from '../../../../../common/components'
import { PaginationFC } from '../../../../../common/components/pagination/PaginationFC'
import { useAppSelector } from '../../../../../common/hooks/reduxHooks'
import { formatDate } from '../../../../../common/utils'
import { UpdateButtons } from '../../../components'
import { PackDataType } from '../../../helpers'
import { UseCards } from '../../../hooks'
import { StyledIcon } from '../../../styles'
import { ListTable } from '../../PackList/pack-list-blocks/PackListTable'

import { BackToPacksButton } from './BackToPacksButton'
import CardMiddleSection from './CardMiddleSection'
import { CardsTopSection } from './CardsTopSection'

export const CardsBlocks = () => {
  const [rows, setRows] = useState<PackDataType[]>()
  const userId = useAppSelector(state => state.auth.userId)
  const { addCard, deleteCard, search, updateCard, response, onChangePaginationHandler } =
    UseCards()

  useEffect(() => {
    if (response && response.data) {
      const { cards } = response.data
      let rows: PackDataType[] = []

      cards.forEach(c => {
        const isMyPack = c.user_id === userId

        rows.push({
          key: c._id,
          question: c.question,
          answer: c.answer,
          updated: formatDate(c.updated),
          grade: c.grade,
          render: () => (
            <div>
              <StyledIcon src={fullStar} alt={'full star'} />
              <StyledIcon src={fullStar} alt={'full star'} />
              <StyledIcon src={fullStar} alt={'full star'} />
              <StyledIcon src={halfStar} alt={'half star'} />
              <StyledIcon src={emptyStar} alt={'empty star'} />
            </div>
          ),
          actions: (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <UpdateButtons
                isMyItem={isMyPack}
                editHandler={() => updateCard(c._id)}
                deleteHandler={() => deleteCard(c._id)}
              />
            </div>
          ),
        })
      })
      setRows(rows)
    }
  }, [response])
  const addNewCard = () => {
    addCard(search.cardsPack_id)
  }

  if (response.isLoading) return <Preloader />

  return (
    <>
      <BackToPacksButton />
      <CardsTopSection
        packName={response?.data?.packName}
        cardsPackId={response?.originalArgs?.cardsPack_id}
        addCard={addNewCard}
        userId={response?.data?.packUserId}
      />
      <CardMiddleSection />
      <ListTable rows={rows} type="cards" />
      <PaginationFC
        current={response.data?.page}
        pageSize={response.data?.pageCount}
        total={response.data?.cardsTotalCount}
        onChange={onChangePaginationHandler}
      />
    </>
  )
}
