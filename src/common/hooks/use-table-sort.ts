import { TableProps } from 'antd'
import { SorterResult } from 'antd/es/table/interface'

import { CardDataType, PackListDataType } from '../../features/tables/helpers'

import { useSearch } from './useSearch'

export const UseTableSort = (sortType: string, name: string) => {
  const titleForEmptyTable = `${name} with that name does not exist`
  const { setSearchParams, search } = useSearch()

  const onChangeTableHandler: TableProps<CardDataType | PackListDataType>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    const srt = sorter as SorterResult<CardDataType | PackListDataType>
    const order = srt.order
    const field = srt.columnKey

    switch (order) {
      case 'ascend':
        setSearchParams({ ...search, [sortType]: `1${field}` })
        break
      case 'descend':
        setSearchParams({ ...search, [sortType]: `0${field}` })
        break
      case undefined: {
        const searchCopy = { ...search }

        delete searchCopy[sortType]
        setSearchParams({ ...searchCopy })
        break
      }
    }
  }

  return { onChangeTableHandler, titleForEmptyTable }
}
