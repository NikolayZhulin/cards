import { useSearchParams } from 'react-router-dom'

export const useLearnCardSearchParams = () => {
  const [searhParams] = useSearchParams()
  const cardsPack_id = Object.fromEntries(searhParams)['cardsPack_id']

  return { cardsPack_id }
}
