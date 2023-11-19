import React, { useState } from 'react'
import { Detail_Text, Label_Text } from '../Fonts'
import { colors } from '../../colors'
import Complete from '../../assets/Imgs/Complete.png'
import InComplete from '../../assets/Imgs/InComplete.png'
import styled from 'styled-components/native'
import { completeTodo } from './Apis'

export const TodoItem = ({ editTodo, categoryId, todo, todoLocalId, getInitDatas, selectedDate, setIsVisible }) => {
  const handlePress = () => {
    //backend쪽으로 isPressed 변경된 값 보내는 구문 "assignNames":[{"assigneeId":1,"assigneeName":"test"},
    completeTodo(todo).then((res) => {
      // console.log('completeTodo res:', res)
      if (res) {
        getInitDatas(selectedDate)
      } else {
        setIsVisible(true)
      }
    })
  }
  let Done = todo.completionStatus == 'COMPLETE'
  let Finished = todo.assignNames[0].completionStatus == 'COMPLETE'
  return (
    <TodoContainer
      disabled={Done}
      style={
        Done
          ? { backgroundColor: colors.grey_150, borderColor: colors.grey_250, borderWidth: 1 }
          : { backgroundColor: colors.grey_100, borderColor: colors.outline, borderWidth: 1 }
      }
      onPress={() => editTodo(categoryId, todoLocalId)}
    >
      <LeftContainer>
        <Label_Text style={{ padding: 4 }} color={Done ? colors.grey_400 : colors.grey_800}>
          {todo.task}
        </Label_Text>
        <MateContainer>
          {todo?.assignNames?.map((assignee, id) => {
            if (id <= 2) {
              return (
                <MateItem
                  key={id}
                  style={{
                    backgroundColor: assignee.completionStatus == 'COMPLETE' ? colors.grey_250 : colors.grey_150,
                  }}
                >
                  <Detail_Text color={colors.grey_600}>{assignee.assigneeName}</Detail_Text>
                </MateItem>
              )
            }
          })}
          {todo?.assignNames.length > 3 && (
            <MateItem style={{ backgroundColor: colors.grey_150 }}>
              <Detail_Text color={colors.secondary}>+{todo?.assignNames.length - 3}</Detail_Text>
            </MateItem>
          )}
        </MateContainer>
      </LeftContainer>
      <CheckBox disabled={Done} onPress={() => handlePress()}>
        {Finished ? (
          <CheckIcon style={{ opacity: Done ? 0.4 : 1 }} source={Complete} />
        ) : (
          <CheckIcon source={InComplete} />
        )}
      </CheckBox>
    </TodoContainer>
  )
}
const TodoContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
  margin-bottom: 8px;
  justify-content: space-between;
  align-items: center;
`
const CheckIcon = styled.Image`
  width: 48px;
  height: 48px;
  margin-right: 12px;
`
const CheckBox = styled.TouchableOpacity``
const MateContainer = styled.View`
  display: flex;
  margin-top: 8px;
  flex-direction: row;
`
const MateItem = styled.View`
  margin-right: 4px;
  padding: 8px 10px;
  border-radius: 99px;
`
const LeftContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: start;
  width: 20%;
`
