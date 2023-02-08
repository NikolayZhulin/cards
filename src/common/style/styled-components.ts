import Card from 'antd/es/card/Card'
import styled from 'styled-components'

export const HeaderComponent = styled.header`
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  background: #b31232;
`
export const FormLabel = styled.label`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #000000;

  opacity: 0.5;
`
export const StyledCard = styled(Card)`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 5px 5px 20px 0 rgba(115, 109, 115, 1);
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`
