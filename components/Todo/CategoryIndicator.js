import React from 'react'
import styled from 'styled-components/native'
import { categoryColors, colors } from '../../colors'
import Add from '../../assets/Svgs/add.svg'
import { Detail_Text, Label_Text } from '../Fonts'

export const CategoryIndicator = ({ startCreateTodo, categoryId, todos }) => {
  return (
    <CategoryContainer style={{ marginTop: 16, marginBottom: 12 }}>
      <CategoryBox onPress={() => startCreateTodo(categoryId)}>
        <Circle style={{ backgroundColor: categoryColors[categoryId % 10] }}></Circle>
        <Label_Text>{todos[1]}</Label_Text>
        <Add width={16} height={16} />
      </CategoryBox>
      <Detail_Text color={colors.grey_600}>
        {todos[2].filter((item) => item.completionStatus == 'COMPLETE').length}/{todos[2].length} 완료
      </Detail_Text>
    </CategoryContainer>
  )
}
const CategoryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const Circle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
`
export const CategoryBox = styled.TouchableOpacity`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  padding: ${Platform.OS == 'android' ? '2px 8px' : '6px 8px'};
  border: 1px solid ${colors.grey_200};
  gap: 8px;
`
