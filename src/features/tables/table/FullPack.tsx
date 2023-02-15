import React, { useEffect, useState } from 'react'

import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined'
import { Table } from 'antd'
import Input from 'antd/es/input/Input'
import { useParams } from 'react-router-dom'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { useAppSelector } from '../../../common/hooks/hooks'
import { PATH } from '../../../common/path/path'
import { FormTitle } from '../../../common/style'
import { formatDate } from '../../../common/utils/SetFormatDate'
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
  useUpdateCardMutation,
} from '../tablesApi'
import { columnsForPack, PackDataType } from '../utils/dataForTables'

export const FullPack = () => {
  const param = useParams()
  const params: FetchCardsRequestType = {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: param.id ? param.id : '',
    min: 0,
    max: 10,
    sortCards: '0updated',
    page: 1,
    pageCount: 10,
  }

  const userID = useAppSelector(state => state.auth.userId)
  const [rows, setRows] = useState<PackDataType[]>()
  const { data } = useFetchCardsQuery(params)
  const [addCard, {}] = useAddCardMutation()
  const [updateCard, {}] = useUpdateCardMutation()
  const [deleteCard, {}] = useDeleteCardMutation()

  useEffect(() => {
    if (data) {
      const { cards } = data

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
  }, [data])

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
        <AddNewItemButton type="primary" onClick={() => addCard(param.id)}>
          Add new pack
        </AddNewItemButton>
      </TopSection>
      <MiddleSection>
        <WideSearchBlock>
          <Title>Search</Title>
          <Input />
        </WideSearchBlock>
      </MiddleSection>
      <Table columns={columnsForPack} dataSource={rows} pagination={false} />
    </TablePageStyle>
  )
}
