import React, { memo, useState } from 'react'
import { DetailSm_Text, Detail_Text, Label_Text } from '../Fonts'
import { colors } from '../../colors'
import Complete from '../../assets/Imgs/Complete.png'
import Alarm from '../../assets/Svgs/Alarm.svg'
import InComplete from '../../assets/Imgs/InComplete.png'
import styled from 'styled-components/native'
import { completeTodo, validateTodo } from './Apis'
import { ActivityIndicator, Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { showDeletedToast, showNotAuthorizedToast } from '../../utils/toastMessages'

const TodoItem = ({ editTodo, categoryId, todo, todoLocalId, refreshData, selectedDate, selectedTeamId }) => {
  const [isLoading, setIsLoading] = useState(false)
  // console.log(todo) // {"assignNames": [{"assigneeId": 5, "assigneeName": "김형석", "completionStatus": "INCOMPLETE"}, {"assigneeId": 9, "assigneeName": "주희", "completionStatus": "COMPLETE"}, {"assigneeId": 11, "assigneeName": "심규민", "completionStatus": "INCOMPLETE"}, {"assigneeId": 13, "assigneeName": "센", "completionStatus": "INCOMPLETE"}, {"assigneeId": 14, "assigneeName": "신민선", "completionStatus": "INCOMPLETE"}], "completionStatus": "INCOMPLETE", "isAssigned": true,
  // "notificationInfo": {"isNotification": true, "notificationTime": "15:06:00"}, "task": "QA", "todoId": 6431}
  //내가 포함되어있는 투두 아이템이며, 첫번째 담당자가 이것을 완수하였을때 -> 즉 내가 완수하였을때!
  //선택된 날짜 == todo의 날짜 => 선택된 날짜가 오늘 이전이다 -> 안보이게
  let meDoneStatus = todo.isAssigned && todo.assignNames[0].completionStatus == 'COMPLETE'

  const handleTodoPress = () => {
    validateTodo(todo.todoId, selectedTeamId).then((isNotValid) => {
      if (isNotValid == true) {
        showNotAuthorizedToast()
      } else {
        editTodo(categoryId, todoLocalId)
      }
    })
  }
  const handleIconPress = () => {
    setIsLoading(true)
    if (todo.isAssigned) {
      completeTodo(todo)
        .then((res) => {
          console.log('Res')
          if (res) {
            refreshData(selectedDate)
          } else {
            Alert.alert('투두 Complete 오류')
          }
        })
        .then(setTimeout(() => setIsLoading(false), 500))
    } else {
      showNotAuthorizedToast()
      setIsLoading(false)
    }
  }

  let tempTime = todo.notificationInfo.notificationTime?.split(':')
  let notificationTime = ''
  if (tempTime) {
    notificationTime =
      tempTime[0] < 12
        ? '오전' + ` ${tempTime[0] > 12 ? tempTime[0] - 12 : tempTime[0]}:${tempTime[1]}`
        : '오후' + ` ${tempTime[0] > 12 ? tempTime[0] - 12 : tempTime[0]}:${tempTime[1]}`
  }
  let Done = todo.completionStatus == 'COMPLETE'

  let t = new Date(new Date().setHours(0, 0, 0, 0))
  let formattedSelectedDate = new Date(selectedDate)
  let passed = t - formattedSelectedDate > 0
  return (
    <TodoContainer
      disabled={Done}
      style={
        Done
          ? { backgroundColor: colors.grey_150, borderColor: colors.grey_250, borderWidth: 1 }
          : { backgroundColor: colors.grey_100, borderColor: colors.outline, borderWidth: 1 }
      }
      onPress={() => handleTodoPress()}
    >
      <LeftContainer>
        <Label_Text style={{ padding: 4 }} color={Done ? colors.grey_400 : colors.grey_800}>
          {todo.task}
        </Label_Text>
        {todo.notificationInfo?.isNotification && (
          <AlarmContainer>
            <Alarm color={colors.grey_300} width={16} height={16} />
            <DetailSm_Text>{notificationTime}</DetailSm_Text>
          </AlarmContainer>
        )}
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
      {!passed && (
        <CheckBox disabled={isLoading} onPress={() => handleIconPress()}>
          {isLoading ? (
            <ActivityIndicator style={{ width: 48, height: 48, marginRight: 12 }} />
          ) : meDoneStatus ? (
            <CheckIcon style={{ opacity: Done ? 0.4 : 1 }} source={Complete} />
          ) : (
            <CheckIcon source={InComplete} />
          )}
        </CheckBox>
      )}
    </TodoContainer>
  )
}
export default memo(TodoItem) //이거 혁신이다 이거 블로그에 쓰자
const TodoContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
  margin-bottom: 8px;
  margin-top: 4px;
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
const AlarmContainer = styled.View`
  flex-direction: row;
  gap: 4px;
`
