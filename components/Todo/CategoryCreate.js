import React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import Add from '../../assets/Svgs/add.svg'
import { TextInput } from 'react-native'
import { Circle } from './CategoryIndicator'

export const CategoryCreate = ({ createCategory }) => {
  return (
    <CategoryCreateContainer>
      <Circle style={{ backgroundColor: colors.primary }}></Circle>
      <TextInput
        style={{ fontFamily: 'Spoqa-Medium', minWidth: 80, width: this.state?.inputWidth }}
        placeholderTextColor={colors.grey_600}
        // onSubmitEditing={(input) => createCategory(input.nativeEvent.text)}
        placeholder="카테고리를 입력해주세요"
        returnKeyType="done"
        inputMode="text"
        // onChangeText={(text) => handleTextInputText(text)}
      />
      <Add width={16} height={16} />
    </CategoryCreateContainer>
  )
}

const CategoryCreateContainer = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  padding: ${Platform.OS == 'android' ? '2px 8px' : '6px 8px'};
  border: 1px solid ${colors.grey_200};
  margin: 16px 0px;
  gap: 8px;
`
