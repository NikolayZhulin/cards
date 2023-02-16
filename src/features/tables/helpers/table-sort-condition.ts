import { Key, SortOrder } from 'antd/es/table/interface'

import { useSearch } from '../../../common/hooks/useSearch'
const { setSearchParams, search } = useSearch()

export const tableSortCondition = (
  order: SortOrder | undefined,
  field: Key | undefined,
  type: 'cards' | 'packs'
) => {}
