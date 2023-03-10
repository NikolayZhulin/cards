import React from 'react'

import { FilterOutlined } from '@ant-design/icons'
import { Button, Radio, Tooltip } from 'antd'

import SearchInput from '../../../common/components/table-search-input/SearchInput'
import TableSlider from '../../../common/components/table-slider/TableSlider'
import { useSearch } from '../../../common/hooks/useSearch'
import {
  MiddleSection,
  SearchBlock,
  SliderBlock,
  Title,
  ToggleAuthorsBlock,
  ToggleOwnerButton,
} from '../../../common/style'

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
        <Radio.Group defaultValue={'all'} buttonStyle="solid">
          <ToggleOwnerButton value={'my'} onClick={getMyPacks}>
            My
          </ToggleOwnerButton>
          <ToggleOwnerButton value={'all'} onClick={getAllPacks}>
            All
          </ToggleOwnerButton>
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
