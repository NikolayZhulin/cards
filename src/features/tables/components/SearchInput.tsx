import React, { ChangeEvent, useEffect, useState } from 'react'

import Input from 'antd/es/input/Input'

import { useDebounce } from '../../../common/hooks/useDebounce'
import { useSearch } from '../../../common/hooks/useSearch'

type SearchInputPropsType = {
  type: 'packName' | 'cardQuestion'
}

const SearchInput = ({ type }: SearchInputPropsType) => {
  const [searchInputValue, setSearchInputValue] = useState('')
  const debouncedValue = useDebounce(searchInputValue, 700)
  const { searchParams, search, setSearchParams } = useSearch()

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams(prevState => ({ ...prevState, ...search, [type]: debouncedValue }))
    } else {
      const copySearch = { ...search }

      delete copySearch[type]
      setSearchParams(prevState => ({ ...prevState, ...copySearch }))
    }
  }, [debouncedValue])

  useEffect(() => {
    if (!search.type) {
      setSearchInputValue('')
    }
  }, [search.type])

  const setPackName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.currentTarget.value)
  }

  return <Input value={searchInputValue} onChange={setPackName} />
}

export default SearchInput
