import React from 'react'

import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined'

import { LinkBackWrapper, StyledLink } from '../../../common/style'
import { PATH } from '../../../common/utils'

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
