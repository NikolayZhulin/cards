import React, { ReactElement, useEffect, useState } from 'react'

import { FolderOpenTwoTone } from '@ant-design/icons'
import { Radio, Table } from 'antd'
import Input from 'antd/es/input/Input'
import type { ColumnsType } from 'antd/es/table'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../../common/hooks/hooks'
import { FormTitle } from '../../../common/style'
import { UpdateButtons } from '../components/UpdateButtons'
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
} from '../styles/style'
import {
  FetchCardsPacksRequestType,
  useAddPackMutation,
  useDeletePackMutation,
  useLazyFetchCardsPackQuery,
  useUpdatePackMutation,
} from '../tablesApi'

type DataType = {
  key: React.Key
  name: ReactElement<any, any>
  cards: number
  updated: string
  created: string
  actions: ReactElement<any, any>
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
    // render: () => (
    //   <>
    //     <StyledIcon onClick={() => console.log('learn icon')} src={learnIcon} alt={'learn icon'} />
    //     <StyledIcon src={editIcon} alt={'edit icon'} />
    //     <StyledIcon src={deleteIcon} alt={'delete icon'} />
    //   </>
    // ),
  },
]

const initialRows: DataType[] = []

// {
//   email: "nya-admin@nya.nya"
//   password: "1qazxcvBG"
//   rememberMe: false }

export const setLeadingZero = (num: number) => {
  return num < 10 ? `0${num}` : num
}

export const formatDate = (str: string) => {
  let date = new Date(str)

  return `${setLeadingZero(date.getUTCDate())}.${setLeadingZero(
    date.getUTCMonth() + 1
  )}.${setLeadingZero(date.getUTCFullYear())}`
}

export const PacksList = () => {
  const [params, setParams] = useState<FetchCardsPacksRequestType>({
    packName: '',
    min: 0,
    max: 110,
    sortPacks: '0created',
    page: 1,
    pageCount: 10,
    user_id: '',
    block: false,
  })
  const userId = useAppSelector(state => state.auth.userId)
  const [rows, setRows] = useState(initialRows)
  // const { data } = useFetchCardsPackQuery(params)
  const [addPack, {}] = useAddPackMutation()
  const [updatePack, {}] = useUpdatePackMutation()
  const [deletePack, {}] = useDeletePackMutation()
  const [trigger, response] = useLazyFetchCardsPackQuery()

  useEffect(() => {
    trigger(params)
  }, [params])

  useEffect(() => {
    if (response && response.data) {
      const { cardPacks } = response.data
      let rows: DataType[] = []

      cardPacks.forEach(p => {
        const isMyPack = userId === p.user_id

        rows.push({
          key: p._id,
          name: <NavLink to={'/full-pack/' + p._id}>{p.name}</NavLink>,
          cards: p.cardsCount,
          updated: formatDate(p.updated),
          created: formatDate(p.created),
          actions: (
            <div style={{ display: 'flex', justifyContent: 'start' }}>
              <FolderOpenTwoTone style={{ fontSize: '20px', margin: '5px' }} />
              <UpdateButtons
                isMyItem={isMyPack}
                editHandler={() => updatePack(p._id)}
                deleteHandler={() => deletePack(p._id)}
              />
              {/*{isMyPack && (*/}
              {/*  <EditTwoTone*/}
              {/*    onClick={() => updatePack(p._id)}*/}
              {/*    style={{ fontSize: '20px', margin: '5px' }}*/}
              {/*  />*/}
              {/*)}*/}
              {/*{isMyPack && (*/}
              {/*  <DeleteTwoTone*/}
              {/*    onClick={() => deletePack(p._id)}*/}
              {/*    style={{ fontSize: '20px', margin: '5px' }}*/}
              {/*  />*/}
              {/*)}*/}
            </div>
          ),
        })
      })
      setRows(rows)
    }
  }, [response])

  const addNewPack = () => {
    addPack({})
  }

  const getMyPacks = () => {
    setParams({ ...params, user_id: userId })
  }
  const getAllPacks = () => {
    setParams({ ...params, user_id: '' })
  }

  return (
    <TablePageStyle>
      <TopSection>
        <FormTitle>Pack list</FormTitle>
        <AddNewItemButton type="primary" onClick={addNewPack}>
          Add new pack
        </AddNewItemButton>
      </TopSection>
      <MiddleSection>
        <SearchBlock>
          <Title>Search</Title>
          <Input />
        </SearchBlock>
        <ToggleAuthorsBlock>
          <Title>Show packs cards</Title>
          <Radio.Group>
            <ToggleOwnerButton onClick={getMyPacks}>My</ToggleOwnerButton>
            <ToggleOwnerButton onClick={getAllPacks}>All</ToggleOwnerButton>
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
