import { useMemo, useState } from 'react'
import axios from 'axios'
import { Keyboard, Platform, Pressable, StatusBar, StyleSheet, Text } from 'react-native'
import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import DateTimePicker from '@react-native-community/datetimepicker'

import { colors } from '../../colors'
import { Input, url } from '../Shared'
import { BodyBoldSm_Text, Body_Text, Detail_Text } from '../Fonts'
import { Button_PinkBg } from '../Buttons'

import Change from '../../assets/Svgs/Todo_change.svg'
import Delete from '../../assets/Svgs/Todo_delete.svg'
import Alarm from '../../assets/Svgs/Alarm.svg'
import Back from '../../assets/Svgs/chevron_back.svg'
import Edit from '../../assets/Svgs/Todo_edit.svg'

export const TodoEditBottomSheet = ({ selectedTodo }) => {
  const screenOptions = useMemo(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,

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
      <Stack.Navigator screenOptions={screenOptions} headerMode="screen">
        <Stack.Screen name="TodoEdit" options={screenAOptions}>
          {(props) => <TodoEdit {...props} selectedTodo={selectedTodo} />}
        </Stack.Screen>
        <Stack.Screen name="TimeSetting" options={screenBOptions} component={TimeSetting} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const TimeSetting = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000))
  const [mode, setMode] = useState('time')

  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <TimeSettingHeader>
        <BackButton style={{ position: 'absolute', top: 12 }} onPress={() => navigation.goBack()}>
          <Back width={24} height={24} />
        </BackButton>
        <Body_Text style={{ width: '100%', textAlign: 'center' }}>시간 설정</Body_Text>
      </TimeSettingHeader>
      <DateTimePicker
        style={{ height: '70%' }}
        textColor={colors.grey_700}
        testID="dateTimePicker"
        value={date}
        display="spinner"
        mode={mode}
        is24Hour={false}
        // minuteInterval={5}
        onChange={() => console.log('hello')}
      />
      <Button_PinkBg isLoading={false} isEnabled={true} text="완료" func={() => console.log('submitted')} />
    </BottomSheetBase>
  )
}
export const TodoEdit = ({ navigation, selectedTodo }) => {
  const [tempArr, setTempArr] = useState(selectedTodo)
  // console.log(':selectedTodo', selectedTodo)
  const editTodo = async (name) => {
    let API = `/user/name`
    const response = await axios.put(
      url + API,
      { nickname: nickname },
      {
        headers: {
          Authorization: accessToken,
          'Content-Type': `application/json; charset=UTF-8`,
        },
      },
    )
    return response.status
  }

  const handleSubmit = () => {
    console.log('submitted')
  }
  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <BottomSheetHeader>
        <Body_Text color={colors.grey_800}>{selectedTodo?.task}</Body_Text>
      </BottomSheetHeader>
      <ContentContainer>
        <RowContainer>
          <SmallBox>
            <Edit width={24} height={24} />
            <Detail_Text>수정하기</Detail_Text>
          </SmallBox>
          <SmallBox>
            <Delete width={24} height={24} />
            <Detail_Text>삭제하기</Detail_Text>
          </SmallBox>
        </RowContainer>
        <BigBox onPress={() => navigation.navigate('TimeSetting')}>
          <Alarm color={colors.grey_800} width={24} height={24} />
          <Detail_Text>시간 알림</Detail_Text>
        </BigBox>
        <BigBox>
          <Change width={24} height={24} />
          <Detail_Text>날짜 변경</Detail_Text>
        </BigBox>
      </ContentContainer>
    </BottomSheetBase>
  )
}

export const TodoCreateBottomSheet = ({ popKeyboard }) => {
  const [users, setUsers] = useState([
    { name: '홍길동1', selected: false },
    { name: '홍길동2', selected: false },
    { name: '홍길동3', selected: false },
    { name: '홍길동4', selected: false },
    { name: '홍길동5', selected: false },
    { name: '홍길동6', selected: false },
    { name: '홍길동7', selected: false },
    { name: '홍길동8', selected: false },
    { name: '홍길동9', selected: false },
    { name: '홍길동10', selected: false },
  ])
  const [name, setName] = useState()
  const selectedUser = users.reduce((acc, user) => {
    if (user.selected) {
      acc.push(user.name)
    }
    return acc
  }, [])

  const selectAll = () => {
    const tempArr = JSON.parse(JSON.stringify(users))
    tempArr.map((e) => {
      e.selected = true
      return e
    })
    setUsers(tempArr)
  }

  const selectUser = (id) => {
    const tempArr = JSON.parse(JSON.stringify(users))
    tempArr[id].selected = !tempArr[id].selected
    setUsers(tempArr)
  }
  const handleSubmit = () => {
    console.log('submitted') //name, selectedUser
  }
  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <BottomSheetHeader>
        <Body_Text color={colors.grey_800}>TODO</Body_Text>
      </BottomSheetHeader>
      <InputContainer>
        <BodyBoldSm_Text style={{ marginBottom: 10 }}>TODO 입력</BodyBoldSm_Text>
        <Input
          style={{ backgroundColor: colors.grey_150, color: colors.grey_700 }}
          autoCapitalize="none"
          placeholderTextColor={colors.grey_450}
          onSubmitEditing={() => Keyboard.dismiss()}
          placeholder="할 일을 입력해주세요"
          returnKeyType="done"
          inputMode="text"
          blurOnSubmit={false}
          onChangeText={(text) => setName(text)}
          onFocus={() => popKeyboard()}
        />
      </InputContainer>
      <BodyBoldSm_Text style={{ marginBottom: 10 }}>담당자 지정</BodyBoldSm_Text>
      <UserContainer>
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
              onPress={() => selectUser(id)}
              style={{ backgroundColor: user?.selected ? colors.red_200 : colors.grey_150 }}
              key={id + 1}
            >
              <Detail_Text color={user?.selected ? colors.grey_700 : colors.grey_600}>{user.name}</Detail_Text>
            </UserItem>
          )
        })}
      </UserContainer>
      <Button_PinkBg isLoading={false} isEnabled={true} text="완료" func={() => handleSubmit()} />
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
  gap: 4;
  align-items: center;
  background-color: ${colors.grey_150};
`
const BigBox = styled.TouchableOpacity`
  height: 48px;
  gap: 4;
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
  justify-content: space-between;
`
const BottomSheetHeader = styled.View`
  flex-direction: row;
  padding: 16px;
  justify-content: center;
`
const TimeSettingHeader = styled.View`
  flex-direction: row;
  padding: 16px 16px 0px 16px;
  justify-content: space-between;
`
const UserItem = styled.TouchableOpacity`
  padding: 8px 12px;
  margin-bottom: 8px;
  margin-right: 8px;
  border-radius: 99px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey_150};
`
