import { Button, Card } from 'antd'
import Checkbox from 'antd/es/checkbox/Checkbox'
import styled from 'styled-components'

export const HeaderComponent = styled.header`
  width: 100%;
  height: 60px;
  z-index: 4;
  position: relative;
  padding: 0 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 5px 5px 20px 0 rgba(115, 109, 115, 1);
`

export const HeaderImg = styled.img`
  width: 150px;
`

export const FormContainer = styled.div`
  margin-bottom: 35px;
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
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`

export const FormTitle = styled.h3`
  width: 320px;
  margin: 0 0 20px;
  display: flex;
  justify-content: center;
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
})<{ width?: string }>`
  width: ${p => p.width || '320px'};
  height: 40px;
  margin-bottom: ${p => (p.width ? '0' : '20px')};
`

export const FormInformationText = styled.div`
  max-width: 320px;
  margin-bottom: 20px;
  color: black;
  opacity: 0.5;
  font-size: 14px;
  font-weight: bold;
`

export const FieldInformationText = styled.div`
  width: 320px;
  margin-bottom: 40px;
  color: black;
  opacity: 0.7;
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
  max-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 5px 5px 20px 0 rgba(115, 109, 115, 1);
`

export const StyledCheckBox = styled(Checkbox)`
  margin: 20px 0;
`
