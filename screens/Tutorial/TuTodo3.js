import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ModalPopUp, PetModalPopUp, ScreenHeight, ScreenLayout, ScreenWidth } from '../../components/Shared'
import { categoryColors, colors } from '../../colors'
import styled from 'styled-components/native'
import { TodoHeader } from '../../components/Todo/TodoHeader'
import { BodyBoldSm_Text, Body_Text, Detail_Text, Label_Text } from '../../components/Fonts'
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native'
import Caution from '../../assets/Svgs/Caution.svg'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Close from '../../assets/Svgs/Close.svg'
import { NoCategory, NoPamily, NoTodo } from '../../components/Todo/NoToDoBox'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import {
  TodoCreateBottomSheet,
  TodoEditBottomSheet,
  TuTodoCreateBottomSheet,
} from '../../components/Todo/TodoBottomSheets'
import { MyCalendarStrip } from '../../components/Todo/CalendarStrip'
import { getCategoryList, getTeamUser, getTodoTeamList, getTodos } from '../../components/Todo/Apis'
import { CategoryIndicator } from '../../components/Todo/CategoryIndicator'
import { useFocusEffect } from '@react-navigation/native'
import { SelectedTeamAtom, TabBarAtom } from '../../recoil/TabAtom'
import TodoItem from '../../components/Todo/TodoItem'
import { TodoMenuModal, TodoModal } from '../../components/Todo/TodoMenuModal'
import { TuCalendarStrip } from '../../components/Todo/TuCalendarStrip'
import CloseIcon from '../../assets/Svgs/Close.svg'
import Add from '../../assets/Svgs/add.svg'
import About3 from '../../assets/Svgs/about3.svg'

export default TuTodo3 = ({ navigation }) => {
  const setIsTabVisible = useSetRecoilState(TabBarAtom)
  const [selectedTeam, setSelectedTeam] = useRecoilState(SelectedTeamAtom)

  const tempDate = new Date()
  //** new Date()를 새벽에 호출하면 ISOString으로 가져올때 하루 전으로 반환하는 문제가 있다. getDate()를 직접 호출하여 정확한 날짜정보를 가져와야함 */
  const today = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${
    tempDate.getDate() < 10 ? `0${tempDate.getDate()}` : tempDate.getDate()
  }`

  const buttonRef = useRef(null)
  const [todosByCategory, setTodosByCategory] = useState([
    [
      '0',
      [
        22,
        '카테고리',
        [
          {
            todoId: 419,
            task: 'Task',
            completionStatus: 'INCOMPLETE',
            assignNames: [
              { assigneeId: 1, assigneeName: '내이름', completionStatus: 'INCOMPLETE' },
              { assigneeId: 2, assigneeName: 'Text', completionStatus: 'COMPLETE' },
              { assigneeId: 3, assigneeName: 'Text', completionStatus: 'INCOMPLETE' },
            ],
            isAssigned: true,
            notificationInfo: { isNotification: true, notificationTime: '12:50:00' },
          },
          {
            todoId: 422,
            task: 'Task',
            completionStatus: 'INCOMPLETE',
            assignNames: [
              { assigneeId: 1, assigneeName: '내이름', completionStatus: 'INCOMPLETE' },
              { assigneeId: 2, assigneeName: 'Text', completionStatus: 'INCOMPLETE' },
              { assigneeId: 3, assigneeName: 'Text', completionStatus: 'INCOMPLETE' },
            ],
            isAssigned: false,
            notificationInfo: { isNotification: false },
          },
        ],
      ],
    ],
    [
      '1',
      [
        24,
        '카테고리',
        [
          {
            todoId: 42,
            task: 'Task',
            completionStatus: 'INCOMPLETE',
            assignNames: [
              { assigneeId: 1, assigneeName: '내이름', completionStatus: 'INCOMPLETE' },
              { assigneeId: 2, assigneeName: 'Text', completionStatus: 'COMPLETE' },
              { assigneeId: 3, assigneeName: 'Text', completionStatus: 'INCOMPLETE' },
            ],
            isAssigned: true,
            notificationInfo: { isNotification: true, notificationTime: '17:40:00' },
          },
          {
            todoId: 12,
            task: 'Task',
            completionStatus: 'INCOMPLETE',
            assignNames: [
              { assigneeId: 1, assigneeName: '내이름', completionStatus: 'INCOMPLETE' },
              { assigneeId: 2, assigneeName: 'Text', completionStatus: 'COMPLETE' },
              { assigneeId: 3, assigneeName: 'Text', completionStatus: 'INCOMPLETE' },
            ],
            isAssigned: false,
            notificationInfo: { isNotification: false },
          },
          {
            todoId: 12,
            task: 'Task',
            completionStatus: 'INCOMPLETE',
            assignNames: [
              { assigneeId: 1, assigneeName: '내이름', completionStatus: 'INCOMPLETE' },
              { assigneeId: 2, assigneeName: 'Text', completionStatus: 'COMPLETE' },
              { assigneeId: 3, assigneeName: 'Text', completionStatus: 'INCOMPLETE' },
            ],
            isAssigned: false,
            notificationInfo: { isNotification: false },
          },
        ],
      ],
    ],
  ])

  const [todoTeamList, setTodoTeamList] = useState(['1', '2', '3'])
  const [teamUserList, setTeamUserList] = useState([
    { id: 25, name: '또지' },
    { id: 25, name: '두덩이' },
    { id: 25, name: '민맘밈' },
    { id: 25, name: '센' },
    { id: 25, name: '김가현' },
  ])

  const [selectedCategoryID, setSelectedCategoryID] = useState(22)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [selectedDate, setSelectedDate] = useState(today)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCreateVisible, setIsCreateVisible] = useState(false)
  const [isCreateMode, setIsCreateMode] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const bottomModal = useRef()

  //prettier-ignore
  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} ><Pressable onPress={()=>Keyboard.dismiss()} style={{flex:1}}/></BottomSheetBackdrop>,[],)

  const getTodosByCategory = async (categories, date) => {}

  const handleTeamChange = (team) => {}
  const onRefresh = useCallback(() => {}, [selectedDate, selectedTeam])
  const refreshData = async (date = today) => {}

  const getAllData = (date = today) => {}

  const handleBottomSheetHeight = (status) => {
    if (status == 0) {
      bottomModal.current?.dismiss()
    } else if (status == 1) {
      bottomModal.current?.snapToIndex(0)
    } else if (status == 2) {
      bottomModal.current?.snapToIndex(1)
    } else {
      bottomModal.current?.snapToIndex(2)
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
  useEffect(() => {
    setIsCreateMode(true)
    setSelectedCategoryID(22)
    handleBottomSheetHeight(2)
    bottomModal.current?.present()
    //handleBottomSheetHeight(0)
  }, [])

  return (
    <ScreenLayout>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          navigation.navigate('TuTodo4')
        }}
      >
        <View
          style={{
            width: ScreenWidth,
            height: ScreenHeight,
            backgroundColor: 'rgba(8, 7, 7, 0.75)',
            position: 'absolute',
            zIndex: 200,
          }}
        >
          <View style={{ position: 'absolute', top: 470, left: 16 + 8 }}>
            <BodyBoldSm_Text color={colors.grey_100}>담당자 지정</BodyBoldSm_Text>
          </View>
          <View style={{ position: 'absolute', top: 500, left: 16 + 8 }}>
            <UserItem style={{ backgroundColor: colors.grey_150 }}>
              <Detail_Text color={colors.grey_600}>모두</Detail_Text>
            </UserItem>
          </View>
          <View style={{ position: 'absolute', top: 510, left: 16 + 8 + 60 }}>
            <About3 width={18} height={26} />
            <View style={{ marginTop: 4 }}>
              <Body_Text color={colors.red_200} style={{ textAlign: 'left' }}>
                ‘모두’를 클릭하면 pamily의
              </Body_Text>
              <Body_Text color={colors.red_200}>모든 회원에게 todo를 할당할 수 있어요</Body_Text>
            </View>
          </View>
          <View style={{ position: 'absolute', bottom: 180, width: ScreenWidth, alignItems: 'center' }}>
            <Body_Text color={colors.red_200}>카테고리를 클릭하여 TODO를 생성할 수 있어요!</Body_Text>
          </View>
        </View>
        <View
          style={{
            width: ScreenWidth,
            height: ScreenHeight,
            backgroundColor: 'rgba(8, 7, 7, 0.4)',
            position: 'absolute',
            zIndex: 99,
          }}
        ></View>

        <ScreenContainer>
          <StatusBar />
          <Pressable disabled={!isMenuOpen} style={{ flex: 1, width: '100%' }} onPress={() => setIsMenuOpen(false)}>
            <ContentLayout>
              <TodoHeader
                buttonRef={buttonRef}
                isMenuOpen={isMenuOpen}
                handleTeamChange={handleTeamChange}
                setIsCreateVisible={setIsCreateVisible}
                todoTeamList={todoTeamList}
                navigation={navigation}
                selectedTeam={{ auth: 'PRESIDENT', name: ' 펫모리', id: 1 }}
                setIsMenuOpen={setIsMenuOpen}
              />
              <ScrollViewContainer>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <MyCalendarStrip selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                  {isLoading ? (
                    <LoadingContainer>
                      <ActivityIndicator />
                    </LoadingContainer>
                  ) : (
                    <TodoItemBase>
                      {todosByCategory?.map((todos, id) => {
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
                                refreshData={refreshData}
                                selectedDate={selectedDate}
                                key={index}
                                todo={todo}
                                todoLocalId={index}
                                categoryId={id}
                                editTodo={startEditTodo}
                              />
                            ))}
                          </>
                        )
                      })}
                    </TodoItemBase>
                  )}
                </ScrollView>
              </ScrollViewContainer>
            </ContentLayout>
          </Pressable>
        </ScreenContainer>
        <View style={{ position: 'absolute', zIndex: 100, top: 300 }}>
          <BottomHeader>
            <BottomBar />
          </BottomHeader>
          <TuTodoCreateBottomSheet
            selectedCategoryID={selectedCategoryID}
            handleBottomSheetHeight={handleBottomSheetHeight}
            teamUserList={teamUserList}
            selectedDate={selectedDate}
            getInitDatas={getAllData}
          />
        </View>
      </Pressable>
      <View style={{ position: 'absolute', bottom: 52, left: ScreenWidth / 2 - 30, zIndex: 110 }}>
        <TouchableOpacity
          style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.navigate('AuthBridge')}
        >
          <CloseIcon width={36} height={36} color={colors.grey_200} />
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  )
}
const ScrollViewContainer = styled.View`
  flex: 1;
  z-index: -1;
`
const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.grey_100};
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
const TodoItemBase = styled.View`
  margin-bottom: 32px;
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
const BottomHeader = styled.View`
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  height: 24px;
  background-color: ${colors.grey_100};
  align-items: center;
  justify-content: flex-end;
`
const BottomBar = styled.View`
  width: 71px;
  height: 6px;
  background-color: ${colors.grey_300};
  border-radius: 99px;
`
export const Circle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
`
export const CategoryBox = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  padding: ${Platform.OS == 'android' ? '2px 8px' : '6px 8px'};
  border: 1px solid ${colors.grey_200};
  gap: 8px;
`
const UserItem = styled.TouchableOpacity`
  height: 31px;
  padding: 0px 14px;
  margin-bottom: 8px;
  margin-right: 8px;
  border-radius: 99px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey_150};
`
