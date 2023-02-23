import React from 'react'

import { MiddleSection, Title, WideSearchBlock } from '../../../styles'
import { SearchInput } from '../components'

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
