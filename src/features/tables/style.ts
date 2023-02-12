import { Radio, Slider } from 'antd'
import Button from 'antd/es/button/button'
import Input from 'antd/es/input/Input'
import Pagination from 'antd/es/pagination/Pagination'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const TablePageStyle = styled.div`
  margin: 40px auto;
  width: 90%;
  max-width: 1008px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 5px 5px 20px 0 rgba(115, 109, 115, 1);
  padding: 24px;
  border-radius: 8px;
  //background-color: cadetblue;
`

export const TopSection = styled.div`
  //background-color: lightgrey;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  h3 {
    margin: 0;
  }
`

export const MiddleSection = styled.div`
  width: 100%;
  min-height: 60px;
  margin-bottom: 24px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  //background-color: antiquewhite;
`

export const Title = styled.h4`
  font-weight: 500;
  font-size: 16px;
  margin: 0 0 5px 0;
  transform: translateX(3px);
  line-height: 20px;
  color: #000000;
`

export const SearchBlock = styled.div`
  //background-color: lightgrey;
`

export const ToggleAuthorsBlock = styled.div`
  display: flex;
  flex-direction: column;
  //background-color: burlywood;
`

export const SliderBlock = styled.div`
  width: 100%;
  max-width: 287px;
  //background-color: lightblue;
`
export const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background-color: red;
`

export const SliderInput = styled(Input)`
  width: 36px;
  height: 36px;
  text-align: center;
  padding: 0;
`

export const StyledSlider = styled(Slider)`
  width: 65%;
`

export const AddNewItemButton = styled(Button)`
  width: 175px;
  height: 36px;
`

export const ToggleOwnerButton = styled(Radio.Button)`
  width: 98px;
  height: 36px;
  text-align: center;
`

export const StyledPagination = styled(Pagination)`
  margin-top: 20px;
  //background-color: crimson;
`

export const WideSearchBlock = styled(SearchBlock)`
  width: 100%;
`

export const EmptyPackSection = styled.div`
  width: 100%;
  height: 300px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-color: cadetblue;
`

export const EmptyPackWarning = styled.span`
  margin-bottom: 20px;
  font-size: 16px;
  opacity: 0.5;
`

export const LinkBackWrapper = styled.div`
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
`

export const StyledLink = styled(Link)`
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: black;
`
