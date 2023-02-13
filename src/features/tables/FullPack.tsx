import React, { useEffect, useState } from 'react'

import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined'
import { Table } from 'antd'
import Input from 'antd/es/input/Input'
import { ColumnsType } from 'antd/es/table'

import { PATH } from '../../common/path/path'
import { FormTitle } from '../../common/style'

import {
  AddNewItemButton,
  LinkBackWrapper,
  MiddleSection,
  StyledLink,
  TablePageStyle,
  Title,
  TopSection,
  WideSearchBlock,
} from './style'
import { FetchCardsRequestType, useFetchCardsQuery } from './tablesApi'

type DataType = {
  key: React.Key
  question: string
  answer: string
  updated: string
  grade: number
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Question',
    width: 318,
    dataIndex: 'question',
    key: 'question',
    fixed: 'left',
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
    render: () => <a>grade</a>,
  },
]

const initialRows: DataType[] = []

const params: FetchCardsRequestType = {
  cardAnswer: '',
  cardQuestion: '',
  cardsPack_id: '6311bf4b1ced5d2bb4e1fa4d',
  min: 1,
  max: 4,
  sortCards: '0grade',
  page: 1,
  pageCount: 7,
}

export const FullPack = () => {
  const [rows, setRows] = useState(initialRows)
  const [isMy, setIsMy] = useState(true)
  const { data } = useFetchCardsQuery(params)

  useEffect(() => {
    if (data) {
      const { cards } = data

      let rows: DataType[] = []

      cards.forEach(c => {
        rows.push({
          key: c._id,
          question: c.question,
          answer: c.answer,
          updated: c.updated,
          grade: c.grade,
        })
      })
      console.log(rows)
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
        <FormTitle>{`${isMy ? 'My' : "Friends's"} Pack`}</FormTitle>
        <AddNewItemButton type="primary">Add new pack</AddNewItemButton>
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
