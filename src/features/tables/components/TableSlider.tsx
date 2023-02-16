import React, { ChangeEvent, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { SliderInput, SliderWrapper, StyledSlider } from '../styles/style'

type TableSliderPropsType = {
  maxCardsCount: number
  minCardsCount: number
  minParam: number
  maxParam: number
}

export const TableSlider = ({
  maxCardsCount,
  minCardsCount,
  minParam,
  maxParam,
}: TableSliderPropsType) => {
  const [value, setValue] = useState([minParam, maxParam])
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  useEffect(() => {
    if (!isNaN(minParam)) {
      setValue([minParam, maxParam])
    } else {
      setValue([minCardsCount, maxCardsCount])
    }
  }, [minCardsCount, maxCardsCount, minParam, maxParam])

  const onChangeHandler = (newVal: number[]) => {
    setValue(newVal)
  }

  const onChangeMinSliderValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newMinValue = +e.currentTarget.value
    const newValue = [newMinValue, value[1]]

    setSearchParams(prevState => ({ ...prevState, ...params, min: newMinValue, max: value[1] }))
    setValue(newValue)
  }
  const onChangeMaxSliderValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = +e.currentTarget.value
    const newValue = [value[0], newMaxValue]

    setSearchParams(prevState => ({ ...prevState, ...params, min: value[0], max: newMaxValue }))
    setValue(newValue)
  }

  const setSearchParamsFromSlider = (value: number[]) => {
    setSearchParams(prevState => ({ ...prevState, ...params, min: value[0], max: value[1] }))
  }

  return (
    <SliderWrapper>
      <SliderInput
        min={0}
        max={maxCardsCount - 1}
        value={value[0]}
        onChange={onChangeMinSliderValue}
      />
      <StyledSlider
        range={{ draggableTrack: false }}
        defaultValue={[minCardsCount, maxCardsCount]}
        min={0}
        max={maxCardsCount}
        value={[value[0], value[1]]}
        onChange={onChangeHandler}
        onAfterChange={setSearchParamsFromSlider}
      />
      <SliderInput min={1} max={maxCardsCount} value={value[1]} onChange={onChangeMaxSliderValue} />
    </SliderWrapper>
  )
}

export default TableSlider
