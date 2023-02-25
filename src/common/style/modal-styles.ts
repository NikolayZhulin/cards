import { Checkbox, Modal, Select } from 'antd'
import Input from 'antd/es/input/Input'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/lib/typography/Title'
import styled from 'styled-components'

export const StyledInput = styled(Input)`
  padding: 0;
  font-size: 14px;
`
export const StyledTextArea = styled(TextArea)`
  padding: 0;
  font-size: 14px;
`

export const StyledDiv = styled.div`
  margin-top: 30px;
  margin-bottom: 5px;
  font-size: 11px;
  line-height: 20px;
  opacity: 0.5;
`
export const StyledTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`

export const StyledModal = styled(Modal)`
  max-width: 400px;
  display: flex;
`

export const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 20px;
  margin-top: 20px;
`
