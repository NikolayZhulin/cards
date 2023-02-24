import { useSearchParams } from 'react-router-dom'

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = Object.fromEntries(searchParams)

  return { setSearchParams, search, searchParams }
}
