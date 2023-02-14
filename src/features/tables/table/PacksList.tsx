import React, { ReactElement, useEffect, useState } from 'react'

import { FolderOpenTwoTone } from '@ant-design/icons'
import { Radio, Table } from 'antd'
import Input from 'antd/es/input/Input'
import type { ColumnsType } from 'antd/es/table'
import { NavLink, useSearchParams } from 'react-router-dom'

import { InitialPreloader } from '../../../common/components'
import { PaginationFC } from '../../../common/components/pagination/PaginationFC'
import { useAppSelector } from '../../../common/hooks/hooks'
import { FormTitle } from '../../../common/style'
import { Login } from '../../auth'
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
    ellipsis: true,
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

export const setLeadingZero = (num: number) => {
  return num < 10 ? `0${num}` : num
}
export const formatDate = (str: string) => {
  let date = new Date(str)

  return `${setLeadingZero(date.getUTCDate())}.${setLeadingZero(
    date.getUTCMonth() + 1
  )}.${setLeadingZero(date.getUTCFullYear())}`
}

type ParamType =
  | 'packName'
  | 'min'
  | 'max'
  | 'sortPacks'
  | 'page'
  | 'pageCount'
  | 'user_id'
  | 'block'

export const PacksList = () => {
  const userId = useAppSelector(state => state.auth.userId)
  const [rows, setRows] = useState(initialRows)
  // const { data } = useFetchCardsPackQuery(params)
  const [addPack, {}] = useAddPackMutation()
  const [updatePack, {}] = useUpdatePackMutation()
  const [deletePack, {}] = useDeletePackMutation()
  const [trigger, result] = useLazyFetchCardsPackQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const search = Object.fromEntries(searchParams)

  const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
    trigger({ ...search, page: newPage, pageCount: newPageCount })
    setSearchParams({ ...search, page: newPage.toString(), pageCount: newPageCount.toString() })
  }

  useEffect(() => {
    trigger(search)
  }, [])

  useEffect(() => {
    if (result && result.data) {
      const { cardPacks } = result.data
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
            </div>
          ),
        })
      })
      setRows(rows)
    }
  }, [result])

  const addNewPack = () => {
    addPack({})
  }

  const getMyPacks = () => {
    trigger({ ...search, user_id: userId?.toString() })
    setSearchParams({ ...search, user_id: userId?.toString() || 'userId' })
  }
  const getAllPacks = () => {
    const newSearch = { ...search }

    newSearch.user_id && delete newSearch.user_id
    trigger(newSearch)
    setSearchParams(newSearch)
  }

  const setCardsCount = (min: number, max: number) => {
    trigger({ ...search, min, max })
    setSearchParams({ ...search, min: min.toString(), max: max.toString() })
  }

  const maxCardsCount = result?.data ? result?.data.maxCardsCount : 78

  if (!isLoggedIn) return <Login />
  if (result.isLoading) return <InitialPreloader />

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
            <SliderInput min={0} max={maxCardsCount - 1} value={search.min || 0} />
            <StyledSlider
              range={{ draggableTrack: true }}
              defaultValue={[+search.min || 0, +search.max || maxCardsCount]}
              min={0}
              max={maxCardsCount}
              onAfterChange={(value: [number, number]) => {
                setCardsCount(value[0], value[1])
              }}
            />
            <SliderInput min={1} max={maxCardsCount} value={search.max || maxCardsCount} />
          </SliderWrapper>
        </SliderBlock>
      </MiddleSection>
      <Table columns={columns} dataSource={rows} pagination={false} />
      {/*<StyledPagination defaultCurrent={1} total={data && data.cardPacksTotalCount} />*/}
      <PaginationFC
        current={result.data?.page || 1}
        pageSize={result.data?.pageCount || 4}
        total={result.data?.cardPacksTotalCount || 100}
        onChange={onChangePaginationHandler}
      />
    </TablePageStyle>
  )
}
