import { useLayoutEffect, useState } from 'react'

import { Pagination } from 'antd'
import { useSearchParams } from 'react-router-dom'

import { InitialPreloader } from '../../common/components'
import { PaginationFC } from '../../common/components/pagination/PaginationFC'
import { useAppSelector } from '../../common/hooks/hooks'
import { Login } from '../auth'

import { RequestURIPackType, useLazyGetPacksQuery } from './pagination-api'

export const PaginationCards = () => {
  const [params, setParams] = useState<RequestURIPackType>({ page: 1, pageCount: 4 })
  const [searchParams, setSearchParams] = useSearchParams()
  const [trigger, result, lastPromiseInfo] = useLazyGetPacksQuery()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  useLayoutEffect(() => {
    const params = Object.fromEntries(searchParams)
    const fetchData = async () => {
      setParams({
        page: +params.page,
        pageCount: +params.pageCount,
      })
    }

    fetchData().then(() => {
      trigger(params)
    })
  }, [])

  const onChangePaginationHandler = (page: number, pageCount: number) => {
    setParams({ page, pageCount })
    setSearchParams({ page: page.toString(), pageCount: pageCount.toString() })
    trigger({ page, pageCount })
  }

  if (!isLoggedIn) return <Login />
  if (result.isLoading) return <InitialPreloader />

  return <PaginationFC />
}
