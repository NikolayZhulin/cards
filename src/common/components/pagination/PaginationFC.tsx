import { Pagination } from 'antd'

type PropsType = {
  current?: number
  pageSize?: number
  total?: number | undefined
  onChange: (newPage: number, newPageCount: number) => void
}
export const PaginationFC = ({ current, pageSize, total, onChange }: PropsType) => {
  const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
    onChange(newPage, newPageCount)
  }

  return (
    <div>
      <Pagination
        onChange={onChangePaginationHandler}
        total={total || 100}
        current={current || 1}
        pageSize={pageSize || 4}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
      />
    </div>
  )
}
