import React, { ReactElement, useEffect, useState } from 'react'

import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined'
import { Table } from 'antd'
import Input from 'antd/es/input/Input'
import { ColumnsType } from 'antd/es/table'
import { useParams } from 'react-router-dom'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { useAppSelector } from '../../../common/hooks/hooks'
import { PATH } from '../../../common/path/path'
import { FormTitle } from '../../../common/style'
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

import { formatDate } from './PacksList'

type DataType = {
  key: React.Key
  question: string
  answer: string
  updated: string
  grade: number
  actions?: ReactElement
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Question',
    width: 318,
    dataIndex: 'question',
    key: 'question',
    fixed: 'left',
    ellipsis: true,
  },
  {
    title: 'Answer',
    width: 140,
    dataIndex: 'answer',
    key: 'answer',
    fixed: 'left',
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    key: 'updated',
    width: 200,
  },
  {
    title: 'Created by',
    dataIndex: 'updated',
    key: 'updated',
    width: 200,
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    fixed: 'right',
    width: 150,
    render: () => (
      <>
        <StyledIcon src={fullStar} alt={'full star'} />
        <StyledIcon src={fullStar} alt={'full star'} />
        <StyledIcon src={fullStar} alt={'full star'} />
        <StyledIcon src={halfStar} alt={'half star'} />
        <StyledIcon src={emptyStar} alt={'empty star'} />
      </>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    fixed: 'right',
    width: 150,
  },
]

const initialRows: DataType[] = []

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
  const [rows, setRows] = useState(initialRows)
  const { data } = useFetchCardsQuery(params)
  const [addCard, {}] = useAddCardMutation()
  const [updateCard, {}] = useUpdateCardMutation()
  const [deleteCard, {}] = useDeleteCardMutation()

  useEffect(() => {
    if (data) {
      const { cards } = data

      let rows: DataType[] = []

      cards.forEach(c => {
        const isMyPack = c.user_id === userID

        rows.push({
          key: c._id,
          question: c.question,
          answer: c.answer,
          updated: formatDate(c.updated),
          grade: c.grade,
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
      <Table columns={columns} dataSource={rows} pagination={false} />
      {/*<StyledPagination defaultCurrent={1} total={data && data.cardPacksTotalCount} />*/}
    </TablePageStyle>
  )
}
