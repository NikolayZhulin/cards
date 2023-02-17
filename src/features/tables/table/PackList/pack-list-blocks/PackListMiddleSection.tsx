import React from 'react'

import { FilterOutlined } from '@ant-design/icons'
import { Button, Radio, Tooltip } from 'antd'

import { useSearch } from '../../../../../common/hooks/useSearch'
import { SearchInput, TableSlider } from '../../../components'
import {
  MiddleSection,
  SearchBlock,
  SliderBlock,
  Title,
  ToggleAuthorsBlock,
  ToggleOwnerButton,
} from '../../../styles'

type PackListMiddleSectionPropsType = {
  getMyPacks: () => void
  getAllPacks: () => void
  maxCardsCount: number
  minCardsCount: number
  min: number
  max: number
}

export const PackListMiddleSection = ({
  getMyPacks,
  getAllPacks,
  maxCardsCount,
  minCardsCount,
  min,
  max,
}: PackListMiddleSectionPropsType) => {
  const { setSearchParams } = useSearch()
  const resetAllFilters = () => {
    setSearchParams({})
  }

  return (
    <MiddleSection>
      <SearchBlock>
        <Title>Search</Title>
        <SearchInput type={'packName'} />
      </SearchBlock>
      <ToggleAuthorsBlock>
        <Title>Show packs cards</Title>
        <Radio.Group>
          <ToggleOwnerButton onClick={getMyPacks}>My</ToggleOwnerButton>
          <ToggleOwnerButton onClick={getAllPacks}>All</ToggleOwnerButton>
        </Radio.Group>
      </ToggleAuthorsBlock>
      <SliderBlock>
        <Title>Numbers of cards</Title>
        <TableSlider
          maxCardsCount={maxCardsCount}
          minCardsCount={minCardsCount}
          minParam={min}
          maxParam={max}
        />
      </SliderBlock>
      <Tooltip title="Reset filters">
        <Button
          onClick={resetAllFilters}
          size="large"
          type="primary"
          shape="circle"
          icon={<FilterOutlined />}
        />
      </Tooltip>
    </MiddleSection>
  )
}
