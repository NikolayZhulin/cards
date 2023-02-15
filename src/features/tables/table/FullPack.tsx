import React, { useEffect, useState } from 'react'

import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined'
import { Table } from 'antd'
import Input from 'antd/es/input/Input'
import { useParams, useSearchParams } from 'react-router-dom'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { InitialPreloader } from '../../../common/components'
import { PaginationFC } from '../../../common/components/pagination/PaginationFC'
import { useAppSelector } from '../../../common/hooks/hooks'
import { PATH } from '../../../common/path/path'
import { FormTitle } from '../../../common/style'
import { formatDate } from '../../../common/utils/SetFormatDate'
import SearchInput from '../components/SearchInput'
import { UpdateButtons } from '../components/UpdateButtons'
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
  FetchCardsRequestType,
  useAddCardMutation,
  useDeleteCardMutation,
  useFetchCardsQuery,
  useLazyFetchCardsPackQuery,
  useLazyFetchCardsQuery,
  useUpdateCardMutation,
} from '../tablesApi'
import { columnsForPack, PackDataType } from '../utils/dataForTables'

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
    console.log(search)
    trigger({ ...search })
  }, [searchParams])

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
        <FormTitle>{` Pack`}</FormTitle>
        <AddNewItemButton type="primary" onClick={() => addCard(search.id)}>
          Add new pack
        </AddNewItemButton>
      </TopSection>
      <MiddleSection>
        <WideSearchBlock>
          <Title>Search</Title>
          <SearchInput type={'cardQuestion'} />
        </WideSearchBlock>
      </MiddleSection>
      <Table columns={columnsForPack} dataSource={rows} pagination={false} />
      <PaginationFC
        current={response.data?.page || 1}
        pageSize={response.data?.pageCount || 4}
        total={response.data?.cardsTotalCount || 100}
        onChange={onChangePaginationHandler}
      />
    </TablePageStyle>
  )
}
