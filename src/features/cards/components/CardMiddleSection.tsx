import React from 'react'

import SearchInput from '../../../common/components/table-search-input/SearchInput'
import { Title, WideSearchBlock, MiddleSection } from '../../../common/style'

const CardMiddleSection = () => {
  return (
    <MiddleSection>
      <WideSearchBlock>
        <Title>Search</Title>
        <SearchInput type={'cardQuestion'} />
      </WideSearchBlock>
    </MiddleSection>
  )
}

export default CardMiddleSection
