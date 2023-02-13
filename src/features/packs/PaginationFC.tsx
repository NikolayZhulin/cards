import { useLayoutEffect, useState } from 'react'

import { Pagination } from 'antd'
import { useSearchParams } from 'react-router-dom'

import { Preloader } from '../../common/components'
import { useAppSelector } from '../../common/hooks/hooks'
import { Login } from '../auth'

import { RequestURIType, useLazyGetPacksQuery } from './pagination-api'

export const PaginationFC = () => {
  const [params, setParams] = useState<RequestURIType>({})
  const [searchParams, setSearchParams] = useSearchParams()
  // const { data, error, isLoading } = useGetPacksQuery<any>(params)
  const [trigger, result, lastPromiseInfo] = useLazyGetPacksQuery()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const isLoading = useAppSelector(state => state.pagination.isLoading)

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

  const onChangePaginationHandler = async (page: number, pageCount: number) => {
    setParams({ page, pageCount })
    setSearchParams({ page: page.toString(), pageCount: pageCount.toString() })
    trigger({ page, pageCount })
  }

  console.log(result)
  if (!isLoggedIn) return <Login />
  if (isLoading) return <Preloader />

  return (
    <div style={{ padding: '20px' }}>
      <Pagination
        onChange={onChangePaginationHandler}
        total={result?.data?.cardPacksTotalCount || 100}
        current={result?.data?.page || 1}
        pageSize={result?.data?.pageCount || 4}
        pageSizeOptions={[10, 20, 30, 40, 50]}
      />
    </div>
  )
}
