import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import { categoryColors, colors } from '../../colors'
import CheckOn from '../../assets/Svgs/Check-box.svg'
import CheckOff from '../../assets/Svgs/Check-box_off.svg'
import { completeTodo } from './Apis'
import { ScreenWidth } from '../Shared'

const SCREEN_WIDTH = Dimensions.get('window').width

export const TodoBox = (props) => {
  const todo = props.data
  const index = props.index
  const accessToken = props.accessToken

  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    todo.completionStatus == 'COMPLETE' && setIsChecked(true)
  }, [])

  return (
    <TodoBoxContainer index={index}>
      <TodoContent>
        <TodoTeam>
          <TeamText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ backgroundColor: categoryColors[todo.categoryId % 10] }}
          >
            {todo.categoryName}
          </TeamText>
        </TodoTeam>
        <TodoItem>
          <ItemText numberOfLines={1} ellipsizeMode="tail">
            {todo.task}
          </ItemText>
        </TodoItem>
      </TodoContent>
      <CheckBox
        onPress={() => {
          completeTodo(accessToken, todo.todoId)
          setIsChecked(!isChecked)
          props.setUpdated(!props.updated)
        }}
      >
        {isChecked ? (
          <CheckOn width={24} height={24} color={categoryColors[todo.categoryId % 10]} />
        ) : (
          <CheckOff width={24} height={24} color={categoryColors[todo.categoryId % 10]} />
        )}
      </CheckBox>
    </TodoBoxContainer>
  )
}

const TodoBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${(ScreenWidth - 40) / 2}px;
  padding: 16px;
  justify-content: space-between;
  gap: 4px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
  margin-bottom: 8px;
  margin-right: ${(props) => (props.index % 2 == 0 ? 8 : 0)}px;
`
const TodoTeam = styled.View`
  width: ${(ScreenWidth - 40) / 2 - 60}px;
  overflow: hidden;
`
const TeamText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
  align-self: flex-start;
  overflow: hidden;
`
const TodoItem = styled.View`
  width: ${(ScreenWidth - 40) / 2 - 60}px;
  overflow: hidden;
`
const ItemText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
  overflow: hidden;
  color: ${colors.grey_600};
`
const TodoContent = styled.View``
const CheckBox = styled.TouchableOpacity``
