import { Button } from 'antd'
import styled from 'styled-components'

import { CardWrapper, StyledCard } from '../../../common/style'

export const HiddenSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const LearnCardWrapper = styled(CardWrapper)`
  height: calc(100vh - 131px);
  justify-content: flex-start;
  margin-top: 20px;
`

export const LearnWrapper = styled.div`
  margin-top: 30px;
  padding-left: 10px;
`
export const LearnStyledCard = styled(StyledCard)`
  width: 440px;
  max-width: 100%;
  max-height: fit-content;
  min-height: 204px;
`

export const NextCardButton = styled(Button)`
  margin-top: 15px;
`

export const Question = styled.span`
  word-wrap: break-word;
  font-size: 16px;
`

export const Answer = styled(Question)`
  margin-bottom: 20px;
`

export const Shots = styled.p`
  font-size: 14px;
  color: gray;
`

export const PreloaderCenterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AnswerButton = styled(Button)`
  margin-top: 20px;
`

export const PackName = styled.h1`
  height: 43px;
`

export const PreloaderMarginTopWrapper = styled.div`
  margin-top: 80px;
`
