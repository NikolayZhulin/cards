import React from 'react'

import { SearchInput } from '../../../components'
import { MiddleSection, Title, WideSearchBlock } from '../../../styles'

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
