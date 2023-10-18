import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScreenLayout, url } from '../../components/Shared'
import { colors } from '../../colors'
import styled from 'styled-components/native'
import { TodoHeader } from '../../components/Todo/TodoHeader'
import { BodyBold_Text, Label_Text } from '../../components/Fonts'
import { Keyboard, NativeModules, Platform, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage' //캐시 지우기 때문에 임시로
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../recoil/AuthAtom'
import axios from 'axios'
import { TodoItem } from '../../components/Todo/TodoItem'
import { NoItem } from '../../components/Todo/NoToDoItem'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { TodoCreateBottomSheet, TodoEditBottomSheet } from '../../components/Todo/TodoBottomSheets'

import Add from '../../assets/Svgs/add.svg'
import { MyCalendarStrip } from '../../components/Todo/CalendarStrip'
import { CategoryCreate } from '../../components/Todo/CategoryCreate'
import { getCategoryList, getTeamUser, getTodoTeamList, getTodos } from '../../components/Todo/Apis'

export default Todo = ({ navigation }) => {
  const { StatusBarManager } = NativeModules
  const { accessToken } = useRecoilValue(userInfoState)

  const [statusBarHeight, setStatusBarHeight] = useState(0)

  const [teamList, setTeamList] = useState([])
  const [teamUserList, setTeamUserList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [selectedTeamID, setSelectedTeamID] = useState(null)

  const [todosByCategory, setTodosByCategory] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [snappoints, setSnappoints] = useState([])

  const bottomModal = useRef()

  //KeyboardAwareView가 정상 작동하기 위해서 StatusBar의 높이값을 초기에 구해야함. prettier-ignore
  Platform.OS == 'ios'
    ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      })
    : null

  //prettier-ignore
  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,[],)

  const createCategory = (text) => {
    Keyboard.dismiss()
    console.log(text)
  }
  const getInitDatas = () => {
    //TodoTeam과 Default TodoTeam에 한해 User들을 일시적으로 반환(나중에 Team 변경하면 해당 변수 대체됨)
    getTodoTeamList(accessToken, 0, 10)
      .then((res) => {
        //1. TeamList를 저장
        let tempTeamList = []
        res.content?.map((team) => tempTeamList.push({ id: team.teamId, name: team.teamName }))
        setTeamList(tempTeamList)
        setSelectedTeamID(tempTeamList[tempTeamList.length - 1]?.id)
        return tempTeamList[tempTeamList.length - 1]?.id
      })
      .then((selectedID_temp) => {
        getCategoryList(selectedID_temp, accessToken).then((categories) => {
          setCategoryList(categories) //[{"categoryId": 1, "categoryName": "test"}, {"categoryId": 2, "categoryName": "test2"}, {"categoryId": 3, "categoryName": "페밀리 카테고리"}]
          getTodosByCategory(categories)
        })
        return selectedID_temp
      })
      .then((selectedID_temp) =>
        getTeamUser(selectedID_temp, accessToken).then((res) => {
          //4. TeamUser를 저장/ teamList의 가장 마지막 요소가 가장 처음에 만들어진 Team이라서 length-1번째 teamId를 인자로 넣었음
          let tempTeamUserList = []
          res.registers?.map((user) => tempTeamUserList.push({ id: user.registerId, name: user.registerName }))
          setTeamUserList(tempTeamUserList) //나중에 Team 변경하면 해당 변수 대체됨
        }),
      )
  }
  const getTodosByCategory = async (categories) => {
    // 각 categoryId에 대해 getTodo 함수를 병렬로 호출
    const todoPromises = categories.map((category) => getTodos(category.categoryId, accessToken))
    // Promise.all()를 사용하여 모든 비동기 작업 완료를 기다림
    const todosArr = await Promise.all(todoPromises)
    // 각 categoryId와 그에 해당하는 todo 객체들을 묶음
    const todosByCategory = categories.reduce((acc, category, id) => {
      acc[category.categoryId - 1] = todosArr[id] //categoryId가 1에서부터 시작하기에 배열 첫번째 요소를 비우지 않게 하기 위해, id-1로 처리함
      return acc
    }, {})
    // console.log(JSON.stringify(todosByCategory))
    console.log(Object.entries(todosByCategory))
    setTodosByCategory(Object.entries(todosByCategory))
  }
  useEffect(() => {
    getInitDatas()
  }, [])

  const popKeyboard = () => {
    setSnappoints(['90%'])
  }
  const createTodo = () => {
    setIsCreateMode(true)
    setSnappoints(['55%'])
    bottomModal.current?.present()
  }
  const editTodo = (index) => {
    setIsCreateMode(false)
    setSelectedTodo(todoData[index])
    setSnappoints(['42%'])
    bottomModal.current?.present()
  }
  return (
    <ScreenLayout verticalOffset={statusBarHeight + 44} behavior="position">
      <ContentContainer>
        <TodoHeader navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ContentBase>
            <MyCalendarStrip />
            {/* <CategoryInputContainer style={{ width: category ? 32 + category.length * 16 : 190 }}> */}
            {!todosByCategory && <NoItem />}
            <CategoryCreate createCategory={createCategory} />
            {todosByCategory &&
              todosByCategory?.map((todos, id) => {
                return (
                  <>
                    <CategoryContainer onPress={() => createTodo()}>
                      <Circle style={{ backgroundColor: colors.primary }}></Circle>
                      <Label_Text>{categoryList[id].categoryName}</Label_Text>
                      <Add width={16} height={16} />
                    </CategoryContainer>
                    {todos[1].map((todo, id) => (
                      <TodoItem title={todo.task} status={todo.status} key={id} index={id} editTodo={editTodo} />
                    ))}
                  </>
                )
              })}
            <TodayButton
              style={{ marginTop: 32 }}
              onPress={() => {
                AsyncStorage.clear()
              }}
            >
              <BodyBold_Text color={colors.grey_400}>캐시 지우기</BodyBold_Text>
            </TodayButton>
          </ContentBase>
        </ScrollView>
      </ContentContainer>
      <BottomSheetModal
        ref={bottomModal}
        onDismiss={() => Keyboard.dismiss()}
        backdropComponent={renderBackdrop}
        // index={-1}
        snapPoints={snappoints}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleHeight={0}
        enableDismissOnClose
        // backgroundComponent={() => <View />}
        // handleIndicatorStyle={{ height: 0 }}
        handleIndicatorStyle={{ backgroundColor: colors.grey_300, width: 72, height: 6, marginTop: 8 }}
      >
        {isCreateMode ? (
          <TodoCreateBottomSheet popKeyboard={popKeyboard} selectedTodo={selectedTodo} />
        ) : (
          <TodoEditBottomSheet popKeyboard={popKeyboard} selectedTodo={selectedTodo} />
        )}
      </BottomSheetModal>
    </ScreenLayout>
  )
}
const ContentBase = styled.View`
  flex: 1;
`
const Circle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
`
const CategoryContainer = styled.TouchableOpacity`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  padding: ${Platform.OS == 'android' ? '2px 8px' : '6px 8px'};
  border: 1px solid ${colors.grey_200};
  margin: 16px 0px;
  gap: 8px;
`
const TodayButton = styled.TouchableOpacity`
  flex-direction: row;
  border: 1px solid ${colors.grey_250};
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  border-radius: 99px;
  display: inline-block;
`
const ContentContainer = styled.View`
  padding: 0px 16px;
`
