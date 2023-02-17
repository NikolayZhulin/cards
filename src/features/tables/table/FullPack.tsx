import React, { useEffect, useState } from 'react'

import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined'
import { useSearchParams } from 'react-router-dom'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { InitialPreloader } from '../../../common/components'
import { DropDown } from '../../../common/components/dropdown/DropDown'
import { PaginationFC } from '../../../common/components/pagination/PaginationFC'
import { useAppSelector } from '../../../common/hooks/hooks'
import { FormTitle } from '../../../common/style'
import { PATH } from '../../../common/utils/path'
import { formatDate } from '../../../common/utils/SetFormatDate'
import { SearchInput, UpdateButtons } from '../components'
import { PackDataType } from '../helpers/dataForTables'
import {
  AddNewItemButton,
  LinkBackWrapper,
  MiddleSection,
  StyledIcon,
  StyledLink,
  TablePageStyle,
  Title,
  TopSection,
  WideSearchBlock,
} from '../styles/style'
import {
  useAddCardMutation,
  useDeleteCardMutation,
  useLazyFetchCardsQuery,
  useUpdateCardMutation,
} from '../tablesApi'

import { ListTable } from './PackList/pack-list-blocks/PackListTable'

export const FullPack = () => {
  const userID = useAppSelector(state => state.auth.userId)
  const [rows, setRows] = useState<PackDataType[]>()
  const [addCard, {}] = useAddCardMutation()
  const [updateCard, {}] = useUpdateCardMutation()
  const [deleteCard, {}] = useDeleteCardMutation()
  const [trigger, response] = useLazyFetchCardsQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = Object.fromEntries(searchParams)

  useEffect(() => {
    trigger({ ...search })
  }, [search.cardsPack_id, search.page, search.pageCount, search.cardQuestion])

  useEffect(() => {
    if (response && response.data) {
      const { cards } = response.data
      let rows: PackDataType[] = []

      cards.forEach(c => {
        const isMyPack = c.user_id === userID

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

  const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
    setSearchParams({ ...search, page: newPage.toString(), pageCount: newPageCount.toString() })
  }

  if (response.isLoading) return <InitialPreloader />

  return (
    <TablePageStyle>
      <LinkBackWrapper>
        <StyledLink to={PATH.PACKS_LIST}>
          <ArrowLeftOutlined />
          Back to Pack List
        </StyledLink>
      </LinkBackWrapper>
      <TopSection>
        <FormTitle>
          {response?.data?.packName}
          <DropDown
            packUserId={response?.data?.packUserId}
            cardsPackId={response?.originalArgs?.cardsPack_id}
          />
        </FormTitle>
        <AddNewItemButton type="primary" onClick={() => addCard(search.cardsPack_id)}>
          Add new card
        </AddNewItemButton>
      </TopSection>
      <MiddleSection>
        <WideSearchBlock>
          <Title>Search</Title>
          <SearchInput type={'cardQuestion'} />
        </WideSearchBlock>
      </MiddleSection>
      <ListTable rows={rows} type="cards" />
      <PaginationFC
        current={response.data?.page}
        pageSize={response.data?.pageCount}
        total={response.data?.cardsTotalCount}
        onChange={onChangePaginationHandler}
      />
    </TablePageStyle>
  )
}
