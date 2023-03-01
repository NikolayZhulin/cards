import { useSelector } from 'react-redux'

import { randomCardSelector } from '../..'
import { Preloader } from '../../../../common/components'
import { useUpdateCard } from '../../hooks'
import { PreloaderCenterWrapper } from '../../styles'

import { CardContent } from './card-content'
import { GradeSection } from './grade-section'

type Props = {
  changeCard: () => void
}

export const Card = ({ changeCard }: Props) => {
  const randomCard = useSelector(randomCardSelector)

  const { grade, changeGrade, updateCardGrade, isLoading } = useUpdateCard(randomCard, changeCard)

  if (isLoading)
    return (
      <PreloaderCenterWrapper>
        <Preloader />
      </PreloaderCenterWrapper>
    )

  return (
    <>
      <CardContent
        question={randomCard.question}
        shots={randomCard.shots}
        questionImg={randomCard.questionImg}
      />

      {/*case doesn't need memo, because everytime randomCard is new*/}
      <GradeSection
        randomCard={randomCard}
        changeGrade={changeGrade}
        grade={grade}
        updateCardGrade={updateCardGrade}
      />
    </>
  )
}
