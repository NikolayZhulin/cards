import { Pagination } from 'antd'

type PropsType = {
  current: number
  pageSize: number
  total: number
  onChange: (newPage: number, newPageCount: number) => void
}
export const PaginationFC = ({ current, pageSize, total, onChange }: PropsType) => {
  const onChangePaginationHandler = (newPage: number, newPageCount: number) => {
    onChange(newPage, newPageCount)
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
