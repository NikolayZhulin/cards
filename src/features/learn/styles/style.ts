import styled from 'styled-components'

import { CardWrapper, StyledCard } from '../../../common/style'

export const HiddenSection = styled.div`
  display: flex;
  flex-direction: column;
`
export const LearnCardWrapper = styled(CardWrapper)`
  height: calc(100vh - 100px);
`

export const LearnWrapper = styled.div`
  margin-top: 30px;
  padding-left: 10px;
`
export const LearnStyledCard = styled(StyledCard)`
  width: 550px;
  max-height: fit-content;
  min-height: 320px;
`
