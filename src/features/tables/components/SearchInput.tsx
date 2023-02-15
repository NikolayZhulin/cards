import React, { ChangeEvent, useEffect, useState } from 'react'

import Input from 'antd/es/input/Input'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '../../../common/hooks/useDebounce'

type SearchInputPropsType = {
  type: 'packName' | 'cardQuestion'
}

const SearchInput = ({ type }: SearchInputPropsType) => {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const debouncedValue = useDebounce(searchInputValue, 700)

  useEffect(() => {
    setSearchParams(prevState => ({ ...prevState, ...params, [type]: debouncedValue }))
  }, [debouncedValue])

  useEffect(() => {
    if (!params.type) {
      setSearchInputValue('')
    }
  }, [params.type])

  const setPackName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.currentTarget.value)
  }

  return <Input value={searchInputValue} onChange={setPackName} />
}

export default SearchInput
