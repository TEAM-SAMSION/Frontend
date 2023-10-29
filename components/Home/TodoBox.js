import React, { useRef, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import { colors } from '../../colors'
import CheckOn from '../../assets/Svgs/Check-box.svg'
import CheckOff from '../../assets/Svgs/Check-box_off.svg'

const SCREEN_WIDTH = Dimensions.get('window').width

export const TodoBox = (props) => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <TodoBoxContainer>
      <TodoContent>
        <TodoTeam>
          <TeamText>패밀리 이름</TeamText>
        </TodoTeam>
        <TodoItem>
          <ItemText>산책시키기</ItemText>
        </TodoItem>
      </TodoContent>
      <CheckBox onPress={() => setIsChecked(!isChecked)}>
        {isChecked ? <CheckOn width={24} height={24} /> : <CheckOff width={24} height={24} />}
      </CheckBox>
    </TodoBoxContainer>
  )
}

const TodoBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 167px;
  padding: 16px;
  justify-content: space-between;
  gap: 4px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
`
const TodoTeam = styled.View``
const TeamText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
  align-self: flex-start;
  background-color: ${colors.red_250};
`
const TodoItem = styled.View``
const ItemText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
  overflow: hidden;
  color: ${colors.grey_600};
`
const TodoContent = styled.View``
const CheckBox = styled.TouchableOpacity``
