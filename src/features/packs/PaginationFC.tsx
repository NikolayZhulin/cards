import { useEffect, useState } from 'react'

import { Pagination, Alert } from 'antd'
import { Navigate, useSearchParams } from 'react-router-dom'

import { Preloader } from '../../common/components/preloader/Preloader'
import { useAppSelector } from '../../common/hooks/hooks'
import { useMeMutation } from '../auth/authAPI'

import { RequestURIType, useGetPacksQuery } from './pagination-api'

export const PaginationFC = () => {
  const [params, setParams] = useState<RequestURIType>({
    page: 1,
    pageCount: 4,
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const [getProfile, {}] = useMeMutation<any>()
  const { data } = useGetPacksQuery<any>(params)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const isLoading = useAppSelector(state => state.pagination.isLoading)
  const error = useAppSelector(state => state.auth.error)

  useEffect(() => {
    getProfile({})
  }, [])

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    setParams({
      page: +params.page || 1,
      pageCount: +params.pageCount || 4,
    })
  }, [])
  const onChangePaginationHandler = (page: number, pageCount: number) => {
    setParams({ page, pageCount })
    setSearchParams({ page: page.toString(), pageCount: pageCount?.toString() })
  }

  if (!isLoggedIn) return <Navigate to={'/login'} />

  return (
    <>
      <Pagination
        onChange={onChangePaginationHandler}
        total={data.cardPacksTotalCount}
        current={data.page}
        pageSize={data.pageCount}
      />
      {isLoading ? <Preloader /> : <></>}
      {error && (
        <Alert
          style={{ position: 'absolute', bottom: '3%' }}
          message={error}
          type="error"
          closable
        />
      )}
    </>
  )
}
