import { useEffect, useState } from 'react'

import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { QueryDefinition } from '@reduxjs/toolkit/query'
import { Pagination } from 'antd'
import { useSearchParams } from 'react-router-dom'

type PropsType = {
  current: number
  pageSize: number
  total: number
  onChange: LazyQueryTrigger<QueryDefinition<any, any, any, any>>
}
export const PaginationFC = ({ current, pageSize, total, onChange }: PropsType) => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const paramsURL = Object.fromEntries(searchParams)

    onChange(paramsURL)
  }, [searchParams])

  const onChangePaginationHandler = (page: number, pageCount: number) => {
    // onChange({ page, pageCount })
    setSearchParams({ page: page.toString(), pageCount: pageCount.toString() })
  }

  return (
    <div style={{ padding: '20px' }}>
      <Pagination
        onChange={onChangePaginationHandler}
        total={total}
        current={current}
        pageSize={pageSize}
        pageSizeOptions={[10, 20, 30, 40, 50]}
      />
    </div>
  )
}
