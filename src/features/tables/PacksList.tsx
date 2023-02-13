import React, { useEffect, useState } from 'react'

import { Radio, Table } from 'antd'
import Input from 'antd/es/input/Input'
import type { ColumnsType } from 'antd/es/table'

import { FormTitle } from '../../common/style'

import {
  AddNewItemButton,
  MiddleSection,
  SearchBlock,
  SliderBlock,
  SliderInput,
  SliderWrapper,
  StyledSlider,
  TablePageStyle,
  Title,
  ToggleAuthorsBlock,
  ToggleOwnerButton,
  TopSection,
} from './style'
import { FetchCardsPacksRequestType, useFetchCardsPackQuery } from './tablesApi'

type DataType = {
  key: React.Key
  name: string
  cards: number
  updated: string
  created: string
  actions: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    width: 318,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Cards',
    width: 140,
    dataIndex: 'cards',
    key: 'cards',
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
    title: 'Action',
    dataIndex: 'actions',
    key: 'actions',
    fixed: 'right',
    width: 150,
    render: () => <a>action</a>,
  },
]

const initialRows: DataType[] = []

// {
//   email: "nya-admin@nya.nya"
//   password: "1qazxcvBG"
//   rememberMe: false }

const params: FetchCardsPacksRequestType = {
  packName: '',
  min: 20,
  max: 110,
  sortPacks: 0,
  page: 1,
  pageCount: 10,
  user_id: '',
  block: false,
}

export const PacksList = () => {
  const [rows, setRows] = useState(initialRows)
  const { data } = useFetchCardsPackQuery(params)

  useEffect(() => {
    if (data) {
      const { cardPacks } = data
      let rows: DataType[] = []

      cardPacks.forEach(p => {
        rows.push({
          key: p._id,
          name: `${p.name} ${p._id}`,
          cards: p.cardsCount,
          updated: p.updated,
          created: p.created,
          actions: 'action',
        })
      })
      console.log(rows)
      setRows(rows)
    }
  }, [data])

  return (
    <TablePageStyle>
      <TopSection>
        <FormTitle>Pack list</FormTitle>
        <AddNewItemButton type="primary">Add new pack</AddNewItemButton>
      </TopSection>
      <MiddleSection>
        <SearchBlock>
          <Title>Search</Title>
          <Input />
        </SearchBlock>
        <ToggleAuthorsBlock>
          <Title>Show packs cards</Title>
          <Radio.Group>
            <ToggleOwnerButton>Large</ToggleOwnerButton>
            <ToggleOwnerButton>Large</ToggleOwnerButton>
          </Radio.Group>
        </ToggleAuthorsBlock>
        <SliderBlock>
          <Title>Numbers of cards</Title>
          <SliderWrapper>
            <SliderInput min={1} max={78} value={1} />
            <StyledSlider min={1} max={78} value={36} />
            <SliderInput min={1} max={78} value={78} />
          </SliderWrapper>
        </SliderBlock>
      </MiddleSection>
      <Table columns={columns} dataSource={rows} pagination={false} />
      {/*<StyledPagination defaultCurrent={1} total={data && data.cardPacksTotalCount} />*/}
    </TablePageStyle>
  )
}
