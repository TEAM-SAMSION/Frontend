import React from 'react'
import { colors } from '../../colors'
import { BodyBold_Text, BodySm_Text, DetailSm_Text } from '../Fonts'
import styled from 'styled-components/native'

export const NoTodo = () => {
  return (
    <NoTodoContainer>
      <BodyBold_Text color={colors.grey_600}>오늘은 예정된 TODO가 없어요</BodyBold_Text>
      <BodySm_Text color={colors.grey_400}>TODO 카테고리를 클릭하여 TODO을 추가해보세요!</BodySm_Text>
    </NoTodoContainer>
  )
}
export const NoPamily = () => {
  return (
    <NoTodoContainer>
      <BodyBold_Text color={colors.grey_600}>참여중인 Pamily가 없어요</BodyBold_Text>
      <BodySm_Text color={colors.grey_400}>Pamily에 참여하거나 생성해보세요!</BodySm_Text>
    </NoTodoContainer>
  )
}
export const NoCategory = () => {
  return (
    <NoTodoContainer>
      <BodyBold_Text color={colors.grey_600}>TODO 카테고리가 없어요</BodyBold_Text>
      <BodySm_Text color={colors.grey_400}>{`아직 세팅된 카테고리가 없군요!
TODO 관리 아이콘을 눌러 카테고리를 추가해보세요!`}</BodySm_Text>
    </NoTodoContainer>
  )
}

const NoTodoContainer = styled.View`
  padding: 16px 16px;
  gap: 4px;
  border-radius: 8px;
  display: inline-block;
  background-color: ${colors.grey_150};
`
