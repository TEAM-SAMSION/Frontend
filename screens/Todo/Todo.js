import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ModalPopUp, ScreenLayout } from '../../components/Shared'
import { colors } from '../../colors'
import styled from 'styled-components/native'
import { TodoHeader } from '../../components/Todo/TodoHeader'
import { BodyBold_Text, Body_Text } from '../../components/Fonts'
import { ActivityIndicator, Keyboard, NativeModules, Platform, Pressable, ScrollView, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage' //캐시 지우기 때문에 임시로
import Caution from '../../assets/Svgs/Caution.svg'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Close from '../../assets/Svgs/Close.svg'
import { accessTokenState, refreshTokenState, userInfoState } from '../../recoil/AuthAtom'
import { TodoItem } from '../../components/Todo/TodoItem'
import { NoItem } from '../../components/Todo/NoToDoItem'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { TodoCreateBottomSheet, TodoEditBottomSheet } from '../../components/Todo/TodoBottomSheets'

import { MyCalendarStrip } from '../../components/Todo/CalendarStrip'
import { checkTokenValid, getCategoryList, getTeamUser, getTodoTeamList, getTodos } from '../../components/Todo/Apis'
import { CategoryIndicator } from '../../components/Todo/CategoryIndicator'
import { useIsFocused } from '@react-navigation/native'
import { TabBarAtom } from '../../recoil/TabAtom'

export default Todo = ({ navigation }) => {
  const isFocused = useIsFocused()
  const setIsTabVisible = useSetRecoilState(TabBarAtom)
  useEffect(() => {
    isFocused && setIsTabVisible(true)
  }, [isFocused])

  const { StatusBarManager } = NativeModules
  const { accessToken, refreshToken } = useRecoilValue(userInfoState)

  const setRefreshToken = useSetRecoilState(refreshTokenState)
  const setAccessToken = useSetRecoilState(accessTokenState)
  // const today = new Date().toISOString().substring(0, 10)
  const tempDate = new Date()
  //** new Date()를 새벽에 호출하면 ISOString으로 가져올때 하루 전으로 반환하는 문제가 있다. getDate()를 직접 호출하여 정확한 날짜정보를 가져와야함 */
  const today = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`

  const [statusBarHeight, setStatusBarHeight] = useState(0)

  const [todosByCategory, setTodosByCategory] = useState(null)

  const [todoTeamList, setTodoTeamList] = useState([])
  const [teamUserList, setTeamUserList] = useState([])
  const [snappoints, setSnappoints] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedCategoryID, setSelectedCategoryID] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [selectedDate, setSelectedDate] = useState(today)

  const [isCreateMode, setIsCreateMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const bottomModal = useRef()

  const updateToken = async (res) => {
    if (res.errorCode == 1004) {
      console.log('토큰유효기간 넘겨서 재발급')
      let API = `/reissue`
      let body = {}
      const response = await axios.post(url + API, body, {
        headers: {
          RefreshToken: refreshToken,
        },
      })
      console.log('토큰재발급 Response:', response.data)
      setRefreshToken(response.data.refreshToken)
      setAccessToken(response.data.accessToken)

      return response.data.accessToken
    } else {
      console.log('토큰 유효하므로 재발급절차 스킾')
    }
  }

  //prettier-ignore
  Platform.OS == 'ios'? StatusBarManager.getHeight((statusBarFrameData) => {setStatusBarHeight(statusBarFrameData.height)}): null //KeyboardAwareView가 정상 작동하기 위해서 StatusBar의 높이값을 초기에 구해야함.

  //prettier-ignore
  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} ><Pressable onPress={()=>Keyboard.dismiss()} style={{flex:1}}/></BottomSheetBackdrop>,[],)

  const changeTodoTeam = (todoTeamId) => {
    //상단 메뉴를 통해 TodoTeam을 변경할때 사용하는 Function
    getCategoryList(todoTeamId, accessToken).then((categories) => {
      getTodosByCategory(categories, selectedDate)
    })
    getTeamUser(todoTeamId, accessToken).then((res) => {
      let tempTeamUserList = []
      res.registers?.map((user) => tempTeamUserList.push({ id: user.registerId, name: user.registerName }))
      setTeamUserList(tempTeamUserList)
    })
  }

  const getTodosByCategory = async (categories, date) => {
    // 각 categoryId에 대해 getTodo 함수를 병렬로 호출
    const todoPromises = categories.map(
      (category) => getTodos(category.categoryId, accessToken, date), //[{"assignNames": [[Object], [Object], [Object], [Object]], "status": "INCOMPLETE", "task": "test", "todoId": 6149}, {"assignNames": [[Object], [Object], [Object], [Object]], "status": "INCOMPLETE", "task": "test", "todoId": 6150},
    )
    // Promise.all()를 사용하여 모든 비동기 작업 완료를 기다림
    const todosArr = await Promise.all(todoPromises) //todosArr = {"0":[1,"test",{"todoId":6161,"task":"test","status":"INCOMPLETE","assignNames":[{"assigneeId":1,"assigneeName":"test"},{"assigneeId":5,"assigneeName":"김형석"},{"assigneeId":6,"assigneeName":null},{"assigneeId":7,"assigneeName":"neon"}]}],
    // 각 categoryId와 그에 해당하는 todo 객체들을 묶음/ 누적값, 현재값, id
    const todosByCategory = categories.reduce((acc, category, id) => {
      acc[id] = [category.categoryId, category.categoryName, todosArr[id]]
      return acc
    }, [])
    if (Object.entries(todosByCategory).length > 0) {
      console.log(Object.entries(todosByCategory)[0][1][2])
      setTodosByCategory(Object.entries(todosByCategory))
    } else {
      setTodosByCategory(null)
    }
  }

  const getInitDatas = (date = today) => {
    setIsLoading(true)
    console.log('todaydate:', date)
    //TodoTeam과 Default TodoTeam에 한해 User들을 일시적으로 반환(나중에 Team 변경하면 해당 변수 대체됨)
    getTodoTeamList(accessToken, 0, 10, updateToken)
      .then((res) => {
        //1. TeamList를 저장
        let tempTeamList = []
        res.content?.map((team) => tempTeamList.push({ id: team.teamId, name: team.teamName }))
        setTodoTeamList(tempTeamList)
        setSelectedTeam({
          name: tempTeamList[tempTeamList.length - 1]?.name,
          id: tempTeamList[tempTeamList.length - 1]?.id,
        })
        // console.log(tempTeamList[tempTeamList.length - 1]?.id)
        return tempTeamList[tempTeamList.length - 1]?.id
      })
      .then((selectedID_temp) => {
        // console.log('selectedID_temp: 133', selectedID_temp)
        getCategoryList(selectedID_temp, accessToken).then((categories) => {
          // console.log('categories: 135', categories)
          getTodosByCategory(categories, date).then(setIsLoading(false))
        })
        return selectedID_temp
      })
      .then((selectedID_temp) =>
        getTeamUser(selectedID_temp, accessToken).then((res) => {
          //4. TeamUser를 저장/ teamList의 가장 마지막 요소가 가장 처음에 만들어진 Team이라서 length-1번째 teamId를 인자로 넣었음
          let tempTeamUserList = []
          res.map((user) => tempTeamUserList.push({ id: user.registerId, name: user.registerName }))
          setTeamUserList(tempTeamUserList) //나중에 Team 변경하면 해당 변수 대체됨
        }),
      )
  }
  const handleDateSelect = (date) => {
    //date = 2023-10-15 //날짜를 선택 시, 해당 날짜에서의 Todo 조회 및 todosByCategory 갱신
    setIsLoading(true)
    setSelectedDate(date)
    getCategoryList(selectedTeam.id, accessToken).then((categories) => {
      getTodosByCategory(categories, date).then(setIsLoading(false))
    })
  }

  useEffect(() => {
    getInitDatas(selectedDate)
  }, [])

  const handleBottomSheetHeight = (status) => {
    if (status == 0) {
      bottomModal.current?.dismiss()
    } else if (status == 1) {
      setSnappoints(['42%'])
    } else if (status == 2) {
      setSnappoints(['55%'])
    } else {
      setSnappoints(['90%'])
    }
  }
  const startCreateTodo = (index) => {
    setIsCreateMode(true)
    setSelectedCategoryID(index)
    handleBottomSheetHeight(2)
    bottomModal.current?.present()
  }
  const startEditTodo = (categoryId, todoId) => {
    setIsCreateMode(false)
    //todosByCategory[categoryId][1] = [2, "카테고리 수정", [{"assignNames": [Array], "completionStatus": "INCOMPLETE", "task": "Test3", "todoId": 6257}]]
    setSelectedTodo(todosByCategory[categoryId][1][2][todoId])
    handleBottomSheetHeight(1)
    bottomModal.current?.present()
  }
  return (
    <ScreenLayout verticalOffset={statusBarHeight + 44} behavior="position">
      <ContentLayout>
        <TodoHeader
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          changeTodoTeam={changeTodoTeam}
          todoTeamList={todoTeamList}
          navigation={navigation}
        />
        {/*
        <TodayButton
          onPress={() =>
            // AsyncStorage.clear()
            checkTokenValid(refreshToken)
          }
        >
          <BodyBold_Text color={colors.grey_400}>토큰재발급</BodyBold_Text>
        </TodayButton> */}
        <ScrollViewContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            <MyCalendarStrip handleDateSelect={handleDateSelect} />
            {!todosByCategory && <NoItem />}
            {isLoading ? (
              <LoadingContainer>
                <ActivityIndicator />
              </LoadingContainer>
            ) : (
              todosByCategory?.map((todos, id) => {
                return (
                  <>
                    <CategoryIndicator
                      key={id}
                      startCreateTodo={startCreateTodo}
                      todos={todos[1]}
                      categoryId={todos[1][0]}
                    />
                    {todos[1][2].map((todo, index) => (
                      <TodoItem
                        setIsVisible={setIsVisible}
                        getInitDatas={getInitDatas}
                        selectedDate={selectedDate}
                        key={index}
                        todo={todo}
                        todoLocalId={index}
                        categoryId={id}
                        //여기서 categoryID는 배열로 불러왔을때, 임의 순서를 나타낸 것이며, 서버 내에서 식별용으로 사용되는 ID값은 아님
                        accessToken={accessToken}
                        editTodo={startEditTodo}
                      />
                    ))}
                  </>
                )
              })
            )}
          </ScrollView>
        </ScrollViewContainer>
      </ContentLayout>
      <BottomSheetModal
        ref={bottomModal}
        backdropComponent={renderBackdrop}
        snapPoints={snappoints}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleHeight={0}
        enableDismissOnClose
        backgroundStyle={{ borderRadius: 24 }}
        handleIndicatorStyle={{ backgroundColor: colors.grey_300, width: 72, height: 6, marginTop: 8 }}
      >
        {isCreateMode ? (
          <TodoCreateBottomSheet
            selectedCategoryID={selectedCategoryID}
            handleBottomSheetHeight={handleBottomSheetHeight}
            teamUserList={teamUserList}
            accessToken={accessToken}
            selectedDate={selectedDate}
            getInitDatas={getInitDatas}
          />
        ) : (
          <TodoEditBottomSheet
            handleBottomSheetHeight={handleBottomSheetHeight}
            teamUserList={teamUserList}
            selectedTodo={selectedTodo}
            accessToken={accessToken}
            selectedDate={selectedDate}
            setSelectedTodo={setSelectedTodo}
            getInitDatas={getInitDatas}
          />
        )}
      </BottomSheetModal>
      <ModalPopUp visible={isVisible} petIcon={false} height={204}>
        <ModalHeader>
          <CloseButton
            onPress={() => {
              setIsVisible(false)
            }}
          >
            <Close width={24} height={24} />
          </CloseButton>
        </ModalHeader>
        <PopContent>
          <Caution width={48} height={48} />
          <Body_Text color={colors.grey_700}>나에게 할당된 TODO가 아닙니다.</Body_Text>
        </PopContent>
      </ModalPopUp>
    </ScreenLayout>
  )
}
const ScrollViewContainer = styled.View`
  flex: 1;
  z-index: -1;
`

const PopContent = styled.View`
  flex-direction: column;
  padding-bottom: 40px;
  gap: 10px;
  align-items: center;
  justify-content: center;
`
const ModalHeader = styled.View`
  width: '100%';
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 24px;
`
const CloseButton = styled.TouchableOpacity``
const TodayButton = styled.TouchableOpacity`
  flex-direction: row;
  border: 1px solid ${colors.grey_250};
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  border-radius: 99px;
  display: inline-block;
`
const LoadingContainer = styled.View`
  flex: 1;
  height: 300px;
  justify-content: center;
`
const ContentLayout = styled.View`
  padding: 0px 16px;
  flex-direction: column;
  flex: 1;
`
