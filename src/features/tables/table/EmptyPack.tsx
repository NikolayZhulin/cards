import React from 'react'

import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined'

import { FormTitle } from '../../../common/style'
import { PATH } from '../../../common/utils/path'
import {
  AddNewItemButton,
  EmptyPackSection,
  EmptyPackWarning,
  LinkBackWrapper,
  StyledLink,
  TablePageStyle,
  TopSection,
} from '../styles/style'

export const EmptyPack = () => {
  return (
    <TablePageStyle>
      <LinkBackWrapper>
        <StyledLink to={PATH.PACKS_LIST}>
          <ArrowLeftOutlined />
          Back to Pack List
        </StyledLink>
      </LinkBackWrapper>
      <TopSection>
        <FormTitle>Name Pack</FormTitle>
      </TopSection>
      <EmptyPackSection>
        <EmptyPackWarning>
          This pack is empty. Click add new card to fill this pack
        </EmptyPackWarning>
        <AddNewItemButton type="primary">Add new card</AddNewItemButton>
      </EmptyPackSection>
    </TablePageStyle>
  )
}
