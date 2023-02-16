import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'

import { FolderOpenTwoTone } from '@ant-design/icons'
import { Radio, Table } from 'antd'
import Input from 'antd/es/input/Input'
import type { ColumnsType } from 'antd/es/table'
import { NavLink, useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../common/hooks/hooks'
import { useDebounce } from '../../common/hooks/useDebounce'
import { FormTitle } from '../../common/style/form-styles'
import { UpdateButtons } from '../tables/components/UpdateButtons'
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
} from '../tables/styles/style'
import {
  FetchCardsPacksRequestType,
  useAddPackMutation,
  useDeletePackMutation,
  useLazyFetchCardsPackQuery,
  useUpdatePackMutation,
} from '../tables/tablesApi'

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

type ParamType =
  | 'packName'
  | 'min'
  | 'max'
  | 'sortPacks'
  | 'page'
  | 'pageCount'
  | 'user_id'
  | 'block'

export const PacksListSearch = () => {
  const [params, setParams] = useState<FetchCardsPacksRequestType>({
    packName: '',
    min: null,
    max: null,
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
  const [searchParams, setSearchParams] = useSearchParams()

  const search = Object.fromEntries(searchParams)

  useEffect(() => {
    const requestParams = {
      user_id: search?.user_id === 'false' ? '' : search.user_id,
      min: +search.min,
      max: +search.max,
      packName: search.packName,
    }

    trigger({ ...params, ...requestParams })
  }, [params, searchParams])

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
    setSearchParams(prevState => {
      return { ...prevState, user_id: userId }
    })
  }
  const getAllPacks = () => {
    setSearchParams(prevState => ({ ...prevState, user_id: 'false' }))
  }

  const setCardsCount = (min: number, max: number) => {
    setSearchParams(prevState => ({ ...prevState, min, max }))
  }
  const maxCardsCount = response?.data ? response?.data.maxCardsCount : 78

  const [searchInputValue, setSearchInputValue] = useState('')

  let debouncedValue = useDebounce(searchInputValue, 700)

  const setPackName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.currentTarget.value)
  }

  useEffect(() => {
    setSearchParams(prevState => ({ ...prevState, packName: debouncedValue }))
  }, [debouncedValue])

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
          <Input value={searchInputValue} onChange={setPackName} />
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
    </TablePageStyle>
  )
}
