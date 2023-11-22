import React from 'react'
import { colors } from '../../colors'
import { BodySm_Text, DetailSm_Text } from '../Fonts'
import styled from 'styled-components/native'

export const NoTodo = () => {
  return (
    <NoTodoContainer>
      <BodySm_Text color={colors.grey_600}>오늘은 예정된 TODO가 없어요</BodySm_Text>
      <DetailSm_Text color={colors.grey_400}>TODO 카테고리를 클릭하여 TODO을 추가해보세요!</DetailSm_Text>
    </NoTodoContainer>
  )
}
export const NoPamily = () => {
  return (
    <NoTodoContainer>
      <BodySm_Text color={colors.grey_600}>참여중인 Pamily가 없어요</BodySm_Text>
      <DetailSm_Text color={colors.grey_400}>Pamily에 참여하거나 생성해보세요!</DetailSm_Text>
    </NoTodoContainer>
  )
}

const NoTodoContainer = styled.View`
  padding: 20px 16px;
  border-radius: 8px;
  display: inline-block;
  background-color: ${colors.grey_150};
`
