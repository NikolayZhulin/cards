import React, { ReactElement, useEffect, useState } from 'react'

import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined'
import { Table, TableProps } from 'antd'
import Input from 'antd/es/input/Input'
import { ColumnsType } from 'antd/es/table'
import { useSearchParams } from 'react-router-dom'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { PaginationFC } from '../../../common/components/pagination/PaginationFC'
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
  useAddCardMutation,
  useDeleteCardMutation,
  useLazyFetchCardsQuery,
  useUpdateCardMutation,
} from '../tablesApi'

import { formatDate } from './copyPacksList'

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
    sorter: true,
  },
  {
    title: 'Answer',
    width: 140,
    dataIndex: 'answer',
    key: 'answer',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    key: 'updated',
    width: 200,
    sorter: true,
  },
  {
    title: 'Created by',
    dataIndex: 'created',
    key: 'created',
    width: 200,
    sorter: true,
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    fixed: 'right',
    width: 150,
    sorter: true,
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
  const userID = useAppSelector(state => state.auth.userId)
  const [rows, setRows] = useState(initialRows)
  const [addCard, {}] = useAddCardMutation()
  const [updateCard, {}] = useUpdateCardMutation()
  const [deleteCard, {}] = useDeleteCardMutation()

  const [trigger, result] = useLazyFetchCardsQuery()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = Object.fromEntries(searchParams)

  const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
    trigger({ ...search, page: newPage, pageCount: newPageCount })
    setSearchParams({ ...search, page: newPage.toString(), pageCount: newPageCount.toString() })
  }

  const onChangeTableHandler: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // @ts-ignore
    const order = sorter.order
    // @ts-ignore
    const field = sorter.columnKey

    if (order === 'ascend') {
      trigger({ ...search, sortCards: `1${field}` })
      setSearchParams({ ...search, sortCards: `1${field}` })
    }
    if (order === 'descend') {
      trigger({ ...search, sortCards: `0${field}` })
      setSearchParams({ ...search, sortCards: `0${field}` })
    }
    if (order === undefined) {
      const searchCopy = { ...search }

      delete searchCopy.sortCards
      trigger({ ...searchCopy })
      setSearchParams({ ...searchCopy })
    }
  }

  useEffect(() => {
    trigger(search)
  }, [])

  useEffect(() => {
    if (result.data) {
      const { cards } = result.data

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
  }, [result.data])

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
        <AddNewItemButton type="primary" onClick={() => addCard(search.cardsPack_id)}>
          Add new pack
        </AddNewItemButton>
      </TopSection>
      <MiddleSection>
        <WideSearchBlock>
          <Title>Search</Title>
          <Input />
        </WideSearchBlock>
      </MiddleSection>
      <Table
        onChange={onChangeTableHandler}
        columns={columns}
        dataSource={rows}
        pagination={false}
      />
      <PaginationFC
        current={result.data?.page || 1}
        pageSize={result.data?.pageCount || 1}
        total={result.data?.cardsTotalCount || 1}
        onChange={onChangePaginationHandler}
      />
    </TablePageStyle>
  )
}
