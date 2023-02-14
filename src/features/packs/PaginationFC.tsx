import { useLayoutEffect, useState } from 'react'

import { Pagination } from 'antd'
import { useSearchParams } from 'react-router-dom'

import { InitialPreloader } from '../../common/components'
import { useAppSelector } from '../../common/hooks/hooks'
import { Login } from '../auth'

type PropsType = {
  data: any
  getData: any
}
export const PaginationFC = (props: PropsType) => {
  const [params, setParams] = useState({ page: 1, pageCount: 4 })
  const [searchParams, setSearchParams] = useSearchParams()
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
      props.getData(params)
    })
  }, [])

  const onChangePaginationHandler = (page: number, pageCount: number) => {
    setParams({ page, pageCount })
    setSearchParams({ page: page.toString(), pageCount: pageCount.toString() })
    props.getData({ page, pageCount })
  }

  if (!isLoggedIn) return <Login />
  if (props.data.isLoading) return <InitialPreloader />

  return (
    <div style={{ padding: '20px' }}>
      <Pagination
        onChange={onChangePaginationHandler}
        total={props.data?.cardPacksTotalCount || 100}
        current={props.data?.page || 1}
        pageSize={props.data?.pageCount || 4}
        pageSizeOptions={[10, 20, 30, 40, 50]}
      />
    </div>
  )
}
