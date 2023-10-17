import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScreenLayout, url } from '../../components/Shared'
import { colors } from '../../colors'
import styled from 'styled-components/native'
import { TodoHeader } from '../../components/Todo/TodoHeader'
import { BodyBold_Text, Label_Text } from '../../components/Fonts'
import { Keyboard, NativeModules, Platform, ScrollView, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage' //캐시 지우기 때문에 임시로
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../recoil/AuthAtom'
import axios from 'axios'
import { TodoItem } from '../../components/Todo/TodoItem'
import { NoItem } from '../../components/Todo/NoToDoItem'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { TodoCreateBottomSheet, TodoEditBottomSheet } from '../../components/Todo/TodoBottomSheets'

import Add from '../../assets/Svgs/add.svg'
import { MyCalendarStrip } from '../../components/Todo/CalendarStrip'
import { CategoryCreate } from '../../components/Todo/CategoryCreate'

export default Todo = ({ navigation }) => {
  const { StatusBarManager } = NativeModules
  const { accessToken } = useRecoilValue(userInfoState)

  const [statusBarHeight, setStatusBarHeight] = useState(0)
  const [inputWidth, setInputWidth] = useState(100)
  const [todoData, setTodoData] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [category, setCategory] = useState('')
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [snappoints, setSnappoints] = useState([])

  const bottomModal = useRef()
  const inputRef = useRef()

  //KeyboardAwareView가 정상 작동하기 위해서 StatusBar의 높이값을 초기에 구해야함.
  Platform.OS == 'ios'
    ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      })
    : null

  //prettier-ignore
  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,[],)

  const getTodos = async (teamId, page = 0, size = 10) => {
    let API = `/todo/list/${teamId}`
    const response = await axios.get(url + API, {
      params: {
        page: 0,
        size: 10,
      },
      headers: {
        Authorization: accessToken,
      },
    })
    // if (response.data.content.length != 0) {//content가 비어있을때
    // setTodoData(response.data.content)
    //{"content": [{"status": "INCOMPLETE", "task": "test", "todoId": 6145}, {"status": "INCOMPLETE", "task": "test", "todoId": 6146}, {"status": "INCOMPLETE", "task": "test", "todoId": 6147}, {"status": "INCOMPLETE", "task": "test", "todoId": 6148}], "hasNext": false, "page": 0, "size": 10}
    // }
    // let tempArr = {
    //   //Todo 생성이 원활하지 못하기 때문에, 우선 임시로 더미데이터 채워넣기
    //   content: [
    //     { status: 'INCOMPLETE', task: 'test1', todoId: 6145 },
    //     { status: 'INCOMPLETE', task: 'test2', todoId: 6146 },
    //     { status: 'INCOMPLETE', task: 'test3', todoId: 6147 },
    //     { status: 'INCOMPLETE', task: 'test4', todoId: 6148 },
    //   ],
    //   hasNext: false,
    //   page: 0,
    //   size: 10,
    // }
    // setTodoData(tempArr.content)
    console.log(response.data)
  }
  const handleTextInputText = (text) => {
    console.log(text)
    setCategory(text)
  }
  useEffect(() => {
    // getDatas()
    getTodos(3)
    // getTeamUser(1).then((res) => console.log(res))
  }, [])

  const createCategory = () => {
    Keyboard.dismiss()
    console.log('categoryCreated')
  }
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
            {!todoData && <NoItem />}
            <CategoryCreate createCategory={createCategory} handleTextInputText={handleTextInputText} />
            <CategoryContainer onPress={() => createTodo()}>
              <Circle style={{ backgroundColor: colors.primary }}></Circle>
              <Label_Text>고고쉼 운영</Label_Text>
              <Add width={16} height={16} />
            </CategoryContainer>
            {todoData &&
              todoData?.map((data, index) => (
                <TodoItem title={data.task} status={data.status} key={index} index={index} editTodo={editTodo} />
              ))}
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
