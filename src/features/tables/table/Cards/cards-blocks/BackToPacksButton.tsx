import React from 'react'

import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined'

import { PATH } from '../../../../../common/utils'
import { LinkBackWrapper, StyledLink } from '../../../styles'

export const BackToPacksButton = () => {
  return (
    <LinkBackWrapper>
      <StyledLink to={PATH.PACKS_LIST}>
        <ArrowLeftOutlined />
        Back to Pack List
      </StyledLink>
    </LinkBackWrapper>
  )
}
