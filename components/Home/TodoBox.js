import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import { categoryColors, colors, homeCategoryColors } from '../../colors'
import CheckOn from '../../assets/Svgs/Check-box.svg'
import CheckOff from '../../assets/Svgs/Check-box_off.svg'
import { completeTodo } from './Apis'
import { ScreenWidth } from '../Shared'

const SCREEN_WIDTH = Dimensions.get('window').width

export const TodoBox = (props) => {
  const todo = props.data
  const index = props.index

  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    todo.completionStatus == 'COMPLETE' && setIsChecked(true)
    todo.completionStatus == 'INCOMPLETE' && setIsChecked(false)
  }, [])

  useEffect(() => {
    todo.completionStatus == 'COMPLETE' && setIsChecked(true)
    todo.completionStatus == 'INCOMPLETE' && setIsChecked(false)
  }, [todo.completionStatus])

  return (
    <TodoBoxContainer
      index={index}
      onPress={() => {
        completeTodo(todo.todoId)
        setIsChecked(!isChecked)
        props.setUpdated(!props.updated)
      }}
    >
      <TodoContent>
        <TodoTeam>
          <DotBox>
            <CategoryColor style={{ backgroundColor: categoryColors[todo.categoryId % 10] }} />
          </DotBox>
          <TeamText numberOfLines={1} ellipsizeMode="tail">
            {todo.categoryName}
          </TeamText>
        </TodoTeam>
        <TodoItem>
          <ItemText numberOfLines={1} ellipsizeMode="tail">
            {todo.task}
          </ItemText>
        </TodoItem>
      </TodoContent>
      <CheckBox>
        {isChecked ? (
          <CheckOn width={28} height={28} color={categoryColors[todo.categoryId % 10]} />
        ) : (
          <CheckOff width={28} height={28} color={categoryColors[todo.categoryId % 10]} />
        )}
      </CheckBox>
    </TodoBoxContainer>
  )
}

const TodoBoxContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  justify-content: space-between;
  gap: 4px;
  border-radius: 8px;
  border: 1.5px solid rgba(0, 0, 0, 0.12);
  margin-bottom: 8px;
`
const TodoTeam = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
  width: ${ScreenWidth - 127}px;
  overflow: hidden;
`
const TeamText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
  align-self: flex-start;
  color: ${colors.grey_700};
  overflow: hidden;
`
const TodoItem = styled.View`
  width: ${ScreenWidth - 127}px;
  overflow: hidden;
  margin-left: 27px;
`
const ItemText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 16px;
  line-height: 22px;
  overflow: hidden;
  color: ${colors.grey_700};
`
const TodoContent = styled.View``
const CheckBox = styled.View``
const CategoryColor = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 99px;
  background-color: ${colors.primary};
`
const DotBox = styled.View`
  width: 19px;
  height: 19px;
  align-items: center;
  justify-content: center;
`
