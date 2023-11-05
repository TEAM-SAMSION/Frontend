import React, { useRef, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import { colors } from '../../colors'
import CheckOn from '../../assets/Svgs/Check-box.svg'
import CheckOff from '../../assets/Svgs/Check-box_off.svg'
import { completeTodo } from './Apis'

const SCREEN_WIDTH = Dimensions.get('window').width

export const TodoBox = (props) => {
  const todo = props.data
  const [isChecked, setIsChecked] = useState(todo.status)

  return (
    <TodoBoxContainer>
      <TodoContent>
        <TodoTeam>
          <TeamText>{todo.teamName}</TeamText>
        </TodoTeam>
        <TodoItem>
          <ItemText>{todo.task}</ItemText>
        </TodoItem>
      </TodoContent>
      <CheckBox
        onPress={() => {
          setIsChecked(!isChecked)
          completeTodo()
        }}
      >
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
