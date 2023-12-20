import { useMemo, useState } from 'react'
import axios from 'axios'
import { ActivityIndicator, Alert, Keyboard, Platform, ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { colors } from '../../colors'
import { Input, ModalPopUp, ScreenWidth, url } from '../Shared'
import { BodyBoldSm_Text, BodySm_Text, Body_Text, Detail_Text } from '../Fonts'
import { Button_PinkBg, Button_PinkBgBottom, Button_PinkBg_Abs } from '../Buttons'

import Caution from '../../assets/Svgs/Caution.svg'
import Change from '../../assets/Svgs/Todo_change.svg'
import Delete from '../../assets/Svgs/Todo_delete.svg'
import Alarm from '../../assets/Svgs/Alarm.svg'
import Back from '../../assets/Svgs/chevron_back.svg'
import Close from '../../assets/Svgs/Close.svg'
import Edit from '../../assets/Svgs/Todo_edit.svg'
import DatePicker from 'react-native-date-picker'
import { deleteTodo, editTodoDate, editTodoName, setTodoAlarm } from './Apis'
import axiosInstance from '../../utils/customAxios'

export const TodoEditBottomSheet = ({
  handleBottomSheetHeight,
  selectedTodo,
  getInitDatas,
  setSelectedTodo,
  selectedDate,
  teamUserList,
}) => {
  const screenOptions = useMemo(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerMode: 'screen',
      headerShown: false,
      safeAreaInsets: { top: 0 },
      cardStyle: {
        backgroundColor: 'white',
        overflow: 'visible',
      },
    }),
    [],
  )
  const Stack = createStackNavigator()

  const screenAOptions = useMemo(() => ({ headerLeft: () => null }), [])
  const screenBOptions = useMemo(() => ({ headerLeft: () => <Back width={16} height={24} /> }), [])

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="TodoEditHome" options={screenAOptions}>
          {(props) => (
            <TodoEditHome
              {...props}
              selectedDate={selectedDate}
              getInitDatas={getInitDatas}
              selectedTodo={selectedTodo}
              handleBottomSheetHeight={handleBottomSheetHeight}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TodoTimeSetting" options={screenBOptions}>
          {(props) => (
            <TodoTimeSetting
              {...props}
              selectedDate={selectedDate}
              getInitDatas={getInitDatas}
              selectedTodo={selectedTodo}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TodoDataEditing" options={screenBOptions}>
          {(props) => (
            <TodoDataEditing
              {...props}
              selectedTodo={selectedTodo}
              selectedDate={selectedDate}
              setSelectedTodo={setSelectedTodo}
              handleBottomSheetHeight={handleBottomSheetHeight}
              getInitDatas={getInitDatas}
              teamUserList={teamUserList}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TodoDateSetting" options={screenBOptions}>
          {(props) => (
            <TodoDateSetting
              {...props}
              handleBottomSheetHeight={handleBottomSheetHeight}
              getInitDatas={getInitDatas}
              selectedDate={selectedDate}
              selectedTodo={selectedTodo}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const TodoEditHome = ({ navigation, selectedTodo, selectedDate, getInitDatas, handleBottomSheetHeight }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleTodoDelete = () => {
    setIsLoading(true)
    if (selectedTodo.isAssigned) {
      deleteTodo(selectedTodo.todoId)
        .then(() => {
          getInitDatas(selectedDate)
        })
        .then(() => {
          setIsLoading(false)
          handleBottomSheetHeight(0)
        })
    } else {
      setIsVisible(true)
      setIsLoading(false)
    }
  }
  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <BottomSheetHeader>
        <Body_Text color={colors.grey_800}>{selectedTodo.task}</Body_Text>
      </BottomSheetHeader>
      <ContentContainer>
        <RowContainer>
          <SmallBox onPress={() => navigation.navigate('TodoDataEditing', { selectedTodo })}>
            <Edit width={24} height={24} />
            <Detail_Text>수정하기</Detail_Text>
          </SmallBox>
          <SmallBox onPress={() => handleTodoDelete()}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Delete width={24} height={24} />
                <Detail_Text>삭제하기</Detail_Text>
              </>
            )}
          </SmallBox>
        </RowContainer>
        <BigBox onPress={() => navigation.navigate('TodoTimeSetting')}>
          <Alarm color={colors.grey_400} width={24} height={24} />
          <Detail_Text>시간알림</Detail_Text>
        </BigBox>
        <BigBox
          onPress={() => {
            navigation.navigate('TodoDateSetting')
          }}
        >
          <Change color={colors.grey_400} width={24} height={24} />
          <Detail_Text>날짜변경</Detail_Text>
        </BigBox>
      </ContentContainer>
      <ModalPopUp visible={isVisible} petIcon={false} height={204}>
        <ModalHeader>
          <CloseButton onPress={() => setIsVisible(false)}>
            <Close width={24} height={24} color={colors.grey_600} />
          </CloseButton>
        </ModalHeader>
        <PopContent>
          <Caution width={48} height={48} />
          <Body_Text color={colors.grey_700}>나에게 할당된 TODO가 아닙니다.</Body_Text>
        </PopContent>
      </ModalPopUp>
    </BottomSheetBase>
  )
}

const ModalHeader = styled.View`
  width: 100%;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 24px;
`
const PopContent = styled.View`
  flex-direction: column;
  padding-bottom: 40px;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const CloseButton = styled.TouchableOpacity``

const TodoDataEditing = ({
  navigation,
  selectedTodo,
  handleBottomSheetHeight,
  getInitDatas,
  selectedDate,
  setSelectedTodo,
  teamUserList,
}) => {
  const [name, setName] = useState(selectedTodo.task)
  const [isLoading, setIsLoading] = useState(false)

  let assigneeNames = selectedTodo.assignNames.map((assignee) => assignee.assigneeName)
  const [users, setUsers] = useState(
    teamUserList?.map(function (user) {
      console.log(user)
      if (assigneeNames.includes(user.name)) {
        return { ...user, selected: true }
      } else {
        return { ...user, selected: false }
      }
    }),
  )
  const selectedUser = users.reduce((acc, user) => {
    if (user.selected) {
      acc.push(user.id)
    }
    return acc
  }, [])

  const editTodo = async () => {
    let data = {
      categoryId: selectedCategoryID,
      description: name,
      scheduledDate: selectedDate,
      registerIds: selectedUser,
    }
    try {
      let API = `/teams/todos`
      const response = axiosInstance.post(url + API, data)
      console.log('CreateTodoSuccessed!, response:', response)
    } catch (e) {
      console.log('CreateTodo Error:', e)
    }
  }
  const selectAll = () => {
    const tempArr = JSON.parse(JSON.stringify(users))
    if (tempArr.filter((item) => item.selected == false).length > 0) {
      //선택되지 않은 담당자가 한명이라도 있으면
      tempArr.map((e) => {
        e.selected = true
        return e
      })
    } else {
      tempArr.map((e) => {
        e.selected = false
        return e
      })
    }
    setUsers(tempArr)
  }

  const selectUser = (id) => {
    const tempArr = JSON.parse(JSON.stringify(users))
    tempArr[id].selected = !tempArr[id].selected
    setUsers(tempArr)
  }
  const popKeyboard = () => {
    Keyboard.dismiss()
    handleBottomSheetHeight(1)
  }
  const updateSelectedTodo = (name) => {
    const tempArr = JSON.parse(JSON.stringify(selectedTodo))
    tempArr.task = name
    setSelectedTodo(tempArr)
  }
  const handleSubmit = () => {
    setIsLoading(true)
    popKeyboard()
    editTodoName(selectedTodo.todoId, name).then((res) => {
      getInitDatas(selectedDate) //BackGround에서의 정보갱신
      updateSelectedTodo(name) //BottomSheet 내부에서의 정보 갱신
      setIsLoading(false)
      navigation.goBack()
    })
  }
  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
        justifyContent: 'flex-start',
      }}
    >
      <View style={{ flex: 38 }}>
        <HeaderWithBackButton style={{ marginBottom: 16 }}>
          <BackButton style={{ position: 'absolute', top: 12 }} onPress={() => navigation.goBack()}>
            <Back width={24} height={24} />
          </BackButton>
          <Body_Text style={{ width: '100%', textAlign: 'center' }} color={colors.grey_800}>
            TODO 수정
          </Body_Text>
        </HeaderWithBackButton>
        <InputContainer>
          <BodyBoldSm_Text style={{ marginBottom: 10 }}>TODO 입력</BodyBoldSm_Text>
          <Input
            style={{ backgroundColor: colors.grey_150 }}
            autoCapitalize="none"
            placeholderTextColor={colors.grey_450}
            onSubmitEditing={() => handleSubmit()}
            placeholder="할 일을 입력해주세요"
            returnKeyType="done"
            inputMode="text"
            blurOnSubmit={false}
            onChangeText={(text) => setName(text)}
            onFocus={() => handleBottomSheetHeight(3)}
            onEndEditing={() => popKeyboard()}
          >
            <BodySm_Text color={colors.grey_600}>{selectedTodo.task}</BodySm_Text>
          </Input>
          {name?.length > 20 && (
            <Detail_Text style={{ marginTop: 4 }} color={colors.red_300}>
              글자 수가 1에서 20 사이여야합니다
            </Detail_Text>
          )}
        </InputContainer>
        <BodyBoldSm_Text style={{ marginBottom: 10 }}>담당자 지정</BodyBoldSm_Text>
        <UserContainer>
          <ScrollView
            style={{ height: '100%' }}
            contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
            showsVerticalScrollIndicator={false}
          >
            <UserItem
              style={{
                backgroundColor:
                  users.filter((item) => item.selected == false).length == 0 ? colors.red_200 : colors.grey_150,
              }}
              key={0}
              onPress={() => selectAll()}
            >
              <Detail_Text color={colors.grey_700}>모두</Detail_Text>
            </UserItem>
            {users?.map((user, id) => {
              return (
                <UserItem
                  key={id + 1}
                  onPress={() => selectUser(id)}
                  style={{ backgroundColor: user?.selected ? colors.red_200 : colors.grey_150 }}
                >
                  <Detail_Text key={id} color={user?.selected ? colors.grey_700 : colors.grey_600}>
                    {user.name}
                  </Detail_Text>
                </UserItem>
              )
            })}
          </ScrollView>
        </UserContainer>
      </View>
      <View style={{ flex: 62 }}>
        <Button_PinkBg
          isLoading={isLoading}
          isEnabled={name.length > 0 && name.length < 21}
          text="완료"
          func={() => handleSubmit()}
        />
      </View>
    </BottomSheetBase>
  )
}
const TodoDateSetting = ({ navigation, selectedTodo, selectedDate, getInitDatas, handleBottomSheetHeight }) => {
  const [isLoading, setIsLoading] = useState(false)
  const initDay = new Date()
  const lastDay = new Date()
  lastDay.setFullYear(lastDay.getFullYear() + 1)

  const [date, setDate] = useState(new Date())
  function dateFormat(date) {
    let dateFormat2 =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 9 ? '0' + date.getDate() : date.getDate())
    return dateFormat2
  }
  const handleSubmit = () => {
    setIsLoading(true)
    // date.setDate(date.getDate() + 1) //이거 왜 date 하루 전으로 최종결정되는거죠? 이거 에러 나중에 탐구해봐야할듯 **

    editTodoDate(selectedTodo.todoId, dateFormat(date)).then((res) => {
      console.log(res)
      setIsLoading(false)
      handleBottomSheetHeight(0)
      getInitDatas(selectedDate)
      navigation.goBack()
    })
  }

  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <HeaderWithBackButton>
        <BackButton style={{ position: 'absolute', top: 12 }} onPress={() => navigation.goBack()}>
          <Back width={24} height={24} />
        </BackButton>
        <Body_Text style={{ width: '100%', textAlign: 'center' }}>날짜이동</Body_Text>
      </HeaderWithBackButton>
      <DatePicker
        date={date}
        minimumDate={initDay}
        maximumDate={lastDay}
        onDateChange={setDate} //이거 양식 안 지키면, 리렌더 이상하게 나서 계속 피커 초기값으로 리턴됨**
        fadeToColor="none"
        locale="ko"
        mode="date"
        style={{ width: ScreenWidth * 0.9 }}
        textColor={colors.grey_700}
        dividerHeight={2}
      />
      <Button_PinkBg isLoading={isLoading} isEnabled={true} text="완료" func={() => handleSubmit()} />
    </BottomSheetBase>
  )
}
const TodoTimeSetting = ({ navigation, selectedTodo, selectedDate, getInitDatas }) => {
  let initTime = new Date()
  initTime.setHours(12, 0, 0)
  const [date, setDate] = useState(initTime)
  const finishSetTime = () => {
    let formattedTime = date.toString().substring(16, 21)
    setTodoAlarm(selectedTodo, formattedTime).then((res) => {
      console.log('setTodoAlarm Res:', res)
      getInitDatas(selectedDate)
      navigation.goBack()
    })
  }
  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <HeaderWithBackButton>
        <BackButton style={{ position: 'absolute', top: 12 }} onPress={() => navigation.goBack()}>
          <Back width={24} height={24} />
        </BackButton>
        <Body_Text style={{ width: '100%', textAlign: 'center' }}>시간 설정</Body_Text>
      </HeaderWithBackButton>
      <DatePicker
        date={date}
        locale="ko"
        onDateChange={setDate}
        fadeToColor="none"
        mode="time"
        style={{ width: ScreenWidth * 0.9 }}
        textColor={colors.grey_700}
        dividerHeight={2}
      />

      <Button_PinkBg isLoading={false} isEnabled={true} text="완료" func={() => finishSetTime()} />
    </BottomSheetBase>
  )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const TodoCreateBottomSheet = ({
  selectedCategoryID,
  handleBottomSheetHeight,
  teamUserList,
  selectedDate,
  getInitDatas,
}) => {
  const [users, setUsers] = useState(teamUserList?.map((users) => ({ ...users, selected: false })))
  const [name, setName] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const selectedUser = users.reduce((acc, user) => {
    if (user.selected) {
      acc.push(user.id)
    }
    return acc
  }, [])

  const selectAll = () => {
    const tempArr = JSON.parse(JSON.stringify(users))
    if (tempArr.filter((item) => item.selected == false).length > 0) {
      //선택되지 않은 담당자가 한명이라도 있으면
      tempArr.map((e) => {
        e.selected = true
        return e
      })
    } else {
      tempArr.map((e) => {
        e.selected = false
        return e
      })
    }
    setUsers(tempArr)
  }

  const selectUser = (id) => {
    const tempArr = JSON.parse(JSON.stringify(users))
    tempArr[id].selected = !tempArr[id].selected
    setUsers(tempArr)
  }
  const createTodo = async () => {
    let data = {
      categoryId: selectedCategoryID,
      description: name,
      scheduledDate: selectedDate,
      registerIds: selectedUser,
    }
    try {
      let API = `/teams/todos`
      const response = axiosInstance.post(url + API, data)
      console.log('CreateTodoSuccessed!, response:', response)
    } catch (e) {
      console.log('CreateTodo Error:', e)
    }
  }
  const handleSubmit = () => {
    setIsLoading(true)
    createTodo().then(() => {
      //추가된 todo아이템이 서버에 등록되는 데에 소요되는 시간이 길어서, 바로 fetch하면 의도치 않은 실행이 되는 문제 발생
      //그게 아니고, updateTodo()에서 실행되는 함수만으로는 모든 요소가 반영되지 않는듯함,
      //임시방편으로 initData함수를 가져왔으나, 나중에 실질적으로 필요로 하는 함수를 추려봐야할 것.
      setIsLoading(false)
      handleBottomSheetHeight(0)
      getInitDatas(selectedDate)
    })
  }
  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <View style={{ flex: 38 }}>
        <BottomSheetHeader>
          <Body_Text color={colors.grey_800}>TODO</Body_Text>
        </BottomSheetHeader>
        <InputContainer>
          <BodyBoldSm_Text style={{ marginBottom: 10 }}>TODO 입력</BodyBoldSm_Text>
          <Input
            style={{ backgroundColor: colors.grey_150, color: colors.grey_700 }}
            autoCapitalize="none"
            placeholderTextColor={colors.grey_450}
            onSubmitEditing={() => {
              Keyboard.dismiss()
              handleBottomSheetHeight(2)
            }}
            maxLength={20}
            placeholder="할 일을 입력해주세요"
            returnKeyType="done"
            inputMode="text"
            blurOnSubmit={false}
            onChangeText={(text) => setName(text)}
            onFocus={() => handleBottomSheetHeight(3)}
          />
          {name?.length > 20 && (
            <Detail_Text style={{ marginTop: 4 }} color={colors.red_300}>
              글자 수가 1에서 20 사이여야합니다
            </Detail_Text>
          )}
        </InputContainer>

        <BodyBoldSm_Text style={{ marginBottom: 10 }}>담당자 지정</BodyBoldSm_Text>
        <UserContainer>
          <ScrollView
            style={{ height: '100%' }}
            contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
            showsVerticalScrollIndicator={false}
          >
            <UserItem
              style={{
                backgroundColor:
                  users.filter((item) => item.selected == false).length == 0 ? colors.red_200 : colors.grey_150,
              }}
              key={0}
              onPress={() => selectAll()}
            >
              <Detail_Text color={colors.grey_700}>모두</Detail_Text>
            </UserItem>
            {users?.map((user, id) => {
              return (
                <UserItem
                  key={id + 1}
                  onPress={() => selectUser(id)}
                  style={{ backgroundColor: user?.selected ? colors.red_200 : colors.grey_150 }}
                >
                  <Detail_Text key={id} color={user?.selected ? colors.grey_700 : colors.grey_600}>
                    {user.name}
                  </Detail_Text>
                </UserItem>
              )
            })}
          </ScrollView>
        </UserContainer>
      </View>
      <View style={{ flex: 62 }}>
        <Button_PinkBg
          isLoading={isLoading}
          isEnabled={!isLoading && selectedUser?.length > 0 && name?.length > 0 && name?.length < 21}
          text="완료"
          func={() => handleSubmit()}
        />
      </View>
    </BottomSheetBase>
  )
}

const BackButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`
const InputContainer = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: 24px;
`
const UserContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
`
const ContentContainer = styled.View`
  flex-direction: column;
  gap: 8px;
  flex: 1;
`
const SmallBox = styled.TouchableOpacity`
  padding: 20px 16px;
  border-radius: 8px;
  flex: 1;
  gap: 4px;
  align-items: center;
  background-color: ${colors.grey_150};
`
const BigBox = styled.TouchableOpacity`
  height: 48px;
  gap: 4px;
  flex-direction: row;
  width: 100%;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grey_150};
`
const RowContainer = styled.View`
  flex-direction: row;
  gap: 9px;
`
const BottomSheetBase = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px 24px 32px 24px;
  flex-direction: column;
  /* justify-content: space-between; */
`
const BottomSheetHeader = styled.View`
  flex-direction: row;
  padding: 16px;
  justify-content: center;
`
const HeaderWithBackButton = styled.View`
  flex-direction: row;
  padding: 16px 16px 0px 16px;
  justify-content: space-between;
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
