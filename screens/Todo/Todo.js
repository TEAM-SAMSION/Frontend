import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PetModalPopUp } from '../../components/Shared'
import { colors } from '../../colors'
import styled from 'styled-components/native'
import { TodoHeader } from '../../components/Todo/TodoHeader'
import { ActivityIndicator, Keyboard, Pressable, RefreshControl, ScrollView, StatusBar } from 'react-native'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { NoCategory, NoPamily, NoTodo } from '../../components/Todo/NoToDoBox'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { TodoCreateBottomSheet, TodoEditBottomSheet } from '../../components/Todo/TodoBottomSheets'

import { MyCalendarStrip } from '../../components/Todo/CalendarStrip'
import { getCategoryList, getTeamUser, getTodoTeamList, getTodos } from '../../components/Todo/Apis'
import { CategoryIndicator } from '../../components/Todo/CategoryIndicator'
import { useFocusEffect } from '@react-navigation/native'
import { SelectedTeamAtom, TabBarAtom } from '../../recoil/TabAtom'
import TodoItem from '../../components/Todo/TodoItem'
import { TodoMenuModal } from '../../components/Todo/TodoMenuModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default Todo = ({ navigation }) => {
  const setIsTabVisible = useSetRecoilState(TabBarAtom)
  const [selectedTeam, setSelectedTeam] = useRecoilState(SelectedTeamAtom)

  const tempDate = new Date()
  //** new Date()를 새벽에 호출하면 ISOString으로 가져올때 하루 전으로 반환하는 문제가 있다. getDate()를 직접 호출하여 정확한 날짜정보를 가져와야함 */
  const today = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${
    tempDate.getDate() < 10 ? `0${tempDate.getDate()}` : tempDate.getDate()
  }`

  const buttonRef = useRef(null)
  const [todosByCategory, setTodosByCategory] = useState(null)

  const [todoTeamList, setTodoTeamList] = useState(null)
  const [teamUserList, setTeamUserList] = useState([])

  const [selectedCategoryID, setSelectedCategoryID] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [selectedDate, setSelectedDate] = useState(today)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [isCreateMode, setIsCreateMode] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const bottomModal = useRef()

  //prettier-ignore
  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} ><Pressable onPress={()=>Keyboard.dismiss()} style={{flex:1}}/></BottomSheetBackdrop>,[],)

  const getTodosByCategory = async (categories, date) => {
    // 각 categoryId에 대해 getTodo 함수를 병렬로 호출
    const todoPromises = categories.map(
      (category) => getTodos(category.categoryId, date), //[{"assignNames": [[Object], [Object], [Object], [Object]], "status": "INCOMPLETE", "task": "test", "todoId": 6149}, {"assignNames": [[Object], [Object], [Object], [Object]], "status": "INCOMPLETE", "task": "test", "todoId": 6150},
    )
    // Promise.all()를 사용하여 모든 비동기 작업 완료를 기다림
    const todosArr = await Promise.all(todoPromises) //todosArr = {"0":[1,"test",{"todoId":6161,"task":"test","status":"INCOMPLETE","assignNames":[{"assigneeId":1,"assigneeName":"test"},{"assigneeId":5,"assigneeName":"김형석"},{"assigneeId":6,"assigneeName":null},{"assigneeId":7,"assigneeName":"neon"}]}],
    // 각 categoryId와 그에 해당하는 todo 객체들을 묶음/ 누적값, 현재값, id
    const todosByCategory = categories.reduce((acc, category, id) => {
      acc[id] = [category.categoryId, category.categoryName, todosArr[id]]
      return acc
    }, [])

    if (Object.entries(todosByCategory).length > 0) {
      setTodosByCategory(Object.entries(todosByCategory))
    } else {
      setTodosByCategory(null)
    }
  }

  const handleTeamChange = (team) => {
    setIsMenuOpen(false)
    setSelectedTeam({ name: team.name, id: team.id, auth: team.auth })
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refreshData(selectedDate)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [selectedDate, selectedTeam])

  const refreshData = async (date = today) => {
    if (selectedTeam) {
      await getCategoryList(selectedTeam.id, date).then((categories) => {
        console.log('2. 카테고리로 Todo 불러와서 저장', categories.toString().substring(0, 10))
        getTodosByCategory(categories, date)
      })
      await getTeamUser(selectedTeam.id).then((res) => {
        let tempTeamUserList = []
        res.map((user) => tempTeamUserList.push({ id: user.registerId, name: user.registerName }))
        console.log('3. 선택된 팀의 사용자들 state로 저장', tempTeamUserList.toString().substring(0, 10))
        setTeamUserList(tempTeamUserList) //나중에 Team 변경하면 해당 변수 대체됨
      })
    } else {
      console.log('선택된 Team없어서, Refresh안함')
    }
  }

  const getAllData = (date = today) => {
    !todoTeamList && setIsLoading(true)
    //TodoTeam과 Default TodoTeam에 한해 User들을 일시적으로 반환(나중에 Team 변경하면 해당 변수 대체됨)
    getTodoTeamList()
      .then((data) => {
        if (data.length == 0) {
          console.log('***. TodoTeam없으므로 getAllData 스킵')
          setIsLoading(false)
          setTodoTeamList(null)
          setSelectedTeam(null)
          setTeamUserList([])
          return false
        }
        let tempTeamList = []
        data.map((team) => tempTeamList.push({ id: team.teamId, name: team.teamName, auth: team.authority }))
        console.log('1. Team 리스트들을 정리')
        setTodoTeamList(tempTeamList)
        if (!selectedTeam) {
          //만약 선택된 팀이 없다면(초기상태의 경우), 불러온 Team의 가장 마지막 팀(가장 최근) 설정
          setSelectedTeam({
            auth: tempTeamList[tempTeamList.length - 1]?.authority,
            name: tempTeamList[tempTeamList.length - 1]?.name,
            id: tempTeamList[tempTeamList.length - 1]?.id,
          })
          return tempTeamList[tempTeamList.length - 1]?.id
        } else {
          tempTeamList.map((team) => {
            if (team.id == selectedTeam.id && team.auth != selectedTeam.auth) {
              setSelectedTeam({
                auth: team.authority,
                name: team.name,
                id: team.id,
              })
            }
          })
          return selectedTeam.id
        }
      })
      .then(async (selectedTeamID) => {
        // console.log('실제로 fetch때 사용되는 팀ID:', selectedTeamID, 'Recoil의 팀ID:', selectedTeam.id)
        if (selectedTeamID) {
          //null 반환받으면, TodoTeam 없다는 것을 의미하기에 api호출 스킵
          await getCategoryList(selectedTeamID, date).then((categories) => {
            console.log('2. 카테고리로 Todo 불러와서 저장', JSON.stringify(categories).substring(0, 10))
            getTodosByCategory(categories, date).then(setIsLoading(false))
          })
          await getTeamUser(selectedTeamID).then((res) => {
            let tempTeamUserList = []
            res.map((user) => tempTeamUserList.push({ id: user.registerId, name: user.registerName }))
            console.log('3. 선택된 팀의 사용자들 state로 저장', JSON.stringify(tempTeamUserList).substring(0, 10))
            setTeamUserList(tempTeamUserList) //나중에 Team 변경하면 해당 변수 대체됨
          })
        } else {
          setTodosByCategory(null)
        }
      })
  }
  useEffect(() => {
    let timer
    timer = setInterval(() => {
      const sec = new Date().getSeconds()
      if (sec) return
      if (selectedTeam) {
        console.log('*********************자동갱신****************************')
        refreshData(selectedDate)
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [selectedTeam, selectedDate])

  useFocusEffect(
    useCallback(() => {
      // AsyncStorage.removeItem('onBoardingDone')
      getAllData(selectedDate)
      setIsTabVisible(true)
    }, [selectedDate, selectedTeam]),
  )
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
  return (
    <ScreenContainer>
      <StatusBar />
      <Pressable disabled={!isMenuOpen} style={{ flex: 1, width: '100%' }} onPress={() => setIsMenuOpen(false)}>
        <ContentLayout>
          <TodoHeader
            buttonRef={buttonRef}
            isMenuOpen={isMenuOpen}
            handleTeamChange={handleTeamChange}
            setIsCreateVisible={setCreateModalOpen}
            todoTeamList={todoTeamList}
            navigation={navigation}
            selectedTeam={selectedTeam}
            setIsMenuOpen={setIsMenuOpen}
          />
          <ScrollViewContainer>
            <ScrollView
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}
              showsVerticalScrollIndicator={false}
            >
              <MyCalendarStrip selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              {!todoTeamList ? (
                <NoPamily />
              ) : !todosByCategory ? (
                <NoCategory />
              ) : (
                todosByCategory?.filter((item) => item[1][2].length > 0).length == 0 && <NoTodo />
              )}
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
                            //여기서 categoryID는 배열로 불러왔을때, 임의 순서를 나타낸 것이며, 서버 내에서 식별용으로 사용되는 ID값은 아님
                            editTodo={startEditTodo}
                            selectedTeamId={selectedTeam?.id}
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
        <BottomSheetModal
          ref={bottomModal}
          backdropComponent={renderBackdrop}
          snapPoints={['44%', '55%', '90%']}
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
              selectedDate={selectedDate}
              selectedTeam={selectedTeam}
              getInitDatas={getAllData}
            />
          ) : (
            <TodoEditBottomSheet
              handleBottomSheetHeight={handleBottomSheetHeight}
              teamUserList={teamUserList}
              selectedTodo={selectedTodo}
              selectedDate={selectedDate}
              setSelectedTodo={setSelectedTodo}
              getInitDatas={getAllData}
            />
          )}
        </BottomSheetModal>
        <PetModalPopUp
          petIcon={true}
          height={211}
          navigation={navigation}
          setIsVisible={setCreateModalOpen}
          visible={createModalOpen}
        />
        <TodoMenuModal
          isVisible={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          todoTeamList={todoTeamList}
          handleTeamChange={handleTeamChange}
          setCreateModalOpen={setCreateModalOpen}
        />
      </Pressable>
    </ScreenContainer>
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
