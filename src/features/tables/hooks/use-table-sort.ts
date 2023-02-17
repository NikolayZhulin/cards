import { TableProps } from 'antd'
import { SorterResult } from 'antd/es/table/interface'

import { useSearch } from '../../../common/hooks/useSearch'
import { PackDataType, PackListDataType } from '../helpers'

export const UseTableSort = (sortType: string, name: string) => {
  const titleForEmptyTable = `${name} with that name does not exist`
  const { setSearchParams, search } = useSearch()

  const onChangeTableHandler: TableProps<PackDataType | PackListDataType>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    const srt = sorter as SorterResult<PackDataType | PackListDataType>
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
