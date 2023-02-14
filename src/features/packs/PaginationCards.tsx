import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { InitialPreloader } from '../../common/components'
import { PaginationFC } from '../../common/components/pagination/PaginationFC'
import { useAppSelector } from '../../common/hooks/hooks'
import { Login } from '../auth'

import { useLazyGetCardsQuery } from './pagination-api'

export const PaginationCards = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [trigger, result] = useLazyGetCardsQuery()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const onChange = (newPage: number, newPageCount: number) => {
    trigger({ newPage, newPageCount })
    setSearchParams({ page: newPage.toString(), pageCount: newPageCount.toString() })
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    console.log(params)
    trigger(params)
  }, [])

  if (!isLoggedIn) return <Login />
  if (result.isLoading) return <InitialPreloader />

  return (
    <PaginationFC
      pageSize={result.data?.pageCount || 4}
      total={result.data?.cardsTotalCount || 100}
      current={result.data?.page || 1}
      onChange={onChange}
    />
  )
}
