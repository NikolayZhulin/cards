import React, { ReactElement, useEffect, useState } from 'react'

import { FolderOpenTwoTone } from '@ant-design/icons'
import { Radio, Table } from 'antd'
import Input from 'antd/es/input/Input'
import type { ColumnsType } from 'antd/es/table'
import { NavLink, useSearchParams } from 'react-router-dom'

import { InitialPreloader } from '../../../../common/components'
import { PaginationFC } from '../../../../common/components/pagination/PaginationFC'
import { useAppSelector } from '../../../../common/hooks/hooks'
import { FormTitle } from '../../../../common/style'
import { formatDate } from '../../../../common/utils/SetFormatDate'
import { Login } from '../../../auth'
import SearchInput from '../../components/SearchInput'
import TableSlider from '../../components/TableSlider'
import { UpdateButtons } from '../../components/UpdateButtons'
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
} from '../../styles/style'
import {
  FetchCardsPacksRequestType,
  useAddPackMutation,
  useDeletePackMutation,
  useLazyFetchCardsPackQuery,
  useUpdatePackMutation,
} from '../../tablesApi'
import { columns, PackListDataType } from '../../utils/dataForTables'

import { usePackList } from './hooks/use-pack-list'

export const PacksList = () => {
  const userId = useAppSelector(state => state.auth.userId)
  const [rows, setRows] = useState<PackListDataType[]>()
  // const [addPack, {}] = useAddPackMutation()
  // const [updatePack, {}] = useUpdatePackMutation()
  // const [deletePack, {}] = useDeletePackMutation()
  // const [trigger, response] = useLazyFetchCardsPackQuery()
  // const [searchParams, setSearchParams] = useSearchParams()
  //
  // const search = Object.fromEntries(searchParams)
  // const maxCardsCount = response?.data ? response?.data.maxCardsCount : 0
  // const minCardsCount = response?.data ? response?.data.minCardsCount : 0
  // useEffect(() => {
  //   trigger({ ...search })
  // }, [searchParams])
  const {
    addNewPack,
    deletePack,
    getAllPacks,
    getMyPacks,
    updatePack,
    maxCardsCount,
    minCardsCount,
    onChangePaginationHandler,
    response,
    search,
  } = usePackList()

  useEffect(() => {
    if (response && response.data) {
      const { cardPacks } = response.data
      let rows: PackListDataType[] = []

      cardPacks.forEach(p => {
        const isMyPack = userId === p.user_id

        rows.push({
          key: p._id,
          name: (
            <NavLink to={`/full-pack?cardsPack_id=` + p._id}>
              {p.name}, {p._id}
            </NavLink>
          ),
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

  // const addNewPack = () => {
  //   addPack({})
  // }
  // const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
  //   setSearchParams({ ...search, page: newPage.toString(), pageCount: newPageCount.toString() })
  // }
  // const getMyPacks = () => {
  //   const newSearch = {}
  //
  //   setSearchParams(prevState => ({ ...prevState, ...newSearch, user_id: userId }))
  // }
  // const getAllPacks = () => {
  //   const newSearch = {}
  //
  //   setSearchParams(prevState => ({ ...prevState, ...newSearch }))
  // }

  if (response.isLoading) return <InitialPreloader />

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
          <SearchInput type={'packName'} />
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
          <TableSlider
            maxCardsCount={maxCardsCount}
            minCardsCount={minCardsCount}
            minParam={+search.min}
            maxParam={+search.max}
          />
        </SliderBlock>
      </MiddleSection>
      <Table columns={columns} dataSource={rows} pagination={false} />
      <PaginationFC
        current={response.data?.page || 1}
        pageSize={response.data?.pageCount || 4}
        total={response.data?.cardPacksTotalCount || 100}
        onChange={onChangePaginationHandler}
      />
    </TablePageStyle>
  )
}
