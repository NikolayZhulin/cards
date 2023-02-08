import { Button, Card } from 'antd'
import styled from 'styled-components'

export const HeaderComponent = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #b31232;
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const Form = styled.form`
  height: 67%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const FormWrapper = styled.div`
  height: 450px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`

export const FormTitle = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: 26px;
`

export const FormLabel = styled.label`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #000000;
  opacity: 0.5;
`

export const PrimaryButton = styled(Button).attrs({
  type: 'primary',
  htmlType: 'submit',
})`
  width: 100%;
  height: 40px;
  margin-top: 10px;
`

export const FormInformationText = styled.div`
  color: black;
  opacity: 0.5;
  font-size: 14px;
`

export const ValidationErrorSpan = styled.span`
  position: absolute;
  top: 62px;
  color: #f82525;
  font-size: 12px;
  font-weight: 400;
`

export const CardWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledCard = styled(Card)`
  width: 350px;
  min-height: 500px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 5px 5px 20px 0 rgba(115, 109, 115, 1);
`
