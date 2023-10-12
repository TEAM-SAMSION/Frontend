import React from 'react'
import { colors } from '../../colors'
import { BodySm_Text, DetailSm_Text } from '../Fonts'
import styled from 'styled-components/native'

export const NoItem = () => {
  return (
    <NoTodoContainer>
      <BodySm_Text color={colors.grey_600}>오늘은 예정된 일정이 없어요.</BodySm_Text>
      <DetailSm_Text color={colors.grey_400}>우측 상단 캘린더 버튼을 클릭하여 일정을 기록해보세요.</DetailSm_Text>
    </NoTodoContainer>
  )
}

const NoTodoContainer = styled.View`
  padding: 20px 16px;
  border-radius: 8px;
  display: inline-block;
  background-color: ${colors.grey_150};
`
