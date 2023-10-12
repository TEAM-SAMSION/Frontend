import React, { useEffect, useRef, useState } from 'react'
import { ScreenKeyboardLayout, ScreenLayout, url } from '../../components/Shared'
import CalendarStrip from 'react-native-calendar-strip'
import { colors } from '../../colors'
import styled from 'styled-components/native'
import Arrow_left from '../../assets/Svgs/arrow_left.svg'
import Arrow_right from '../../assets/Svgs/arrow_right.svg'
import Reset from '../../assets/Svgs/Reset.svg'
import Close from '../../assets/Svgs/Close.svg'
import { TodoHeader } from '../../components/Todo/TodoHeader'
import { BodyBoldSm_Text, BodyBold_Text, BodySm_Text, DetailSm_Text, Detail_Text } from '../../components/Fonts'
import { NotificationButton } from '../../components/Buttons'
import { Keyboard, NativeModules, Platform, ScrollView, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage' //캐시 지우기 때문에 임시로
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../recoil/AuthAtom'
import axios from 'axios'
import { TodoItem } from '../../components/Todo/TodoItem'
import { NoItem } from '../../components/Todo/NoToDoItem'

export default Todo = ({ navigation }) => {
  const { StatusBarManager } = NativeModules
  const { accessToken } = useRecoilValue(userInfoState)
  const [statusBarHeight, setStatusBarHeight] = useState(0)
  const [todoData, setTodoData] = useState(null)

  Platform.OS == 'ios'
    ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      })
    : null

  const today = new Date()
  // const markedDate = [
  //   {
  //     date: today,
  //     dots: [
  //       {
  //         color: 'red',
  //       },
  //     ],
  //   },
  // ]
  const createRandomCode = async () => {
    let API = `/todo/team/code`
    const response = await axios.get(url + API, {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    console.log('createRandomCode 결과', response.data)
  }
  //prettier-ignore
  const createTodoTeam = async (name) => {//임시로 팀 생성하기 위해 만들어본 함수호출문 -> FormData 어렵다ㅏㅏ~~
    let API = `/todo/team`
    const randomCode = createRandomCode()
    const teamData = new FormData()
    teamData.append('teamName', 'TestTeamName')
    teamData.append('randomCode', randomCode)

    teamData.append('petRegisters[0].name', 'testPetName')
    teamData.append('petRegisters[0].age', 2)
    teamData.append('petRegisters[0].description', 'testDescription')

    const response = await axios.post(url + API, teamData, {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'multipart/form-data;charset=UTF-8; boundary=6o2knFse3p53ty9dmcQvWAIx1zInP11uCfbm',
      },
    })
    console.log(response.data)
  }
  const getTodoTeamList = async (page, size) => {
    let API = `/todo/team/list?page=${page}&size=${size}` //500
    const response = await axios.get(url + API, {
      headers: {
        Authorization: accessToken,
      },
    })
    return response.data
  }
  const getTeamUser = async (teamId) => {
    console.log(teamId)
    let API = `/register/list?teamId=${teamId}`
    const response = await axios.get(url + API, {
      headers: {
        Authorization: accessToken,
      },
    })
    return response.data
  }

  const getTeamUsers = async (data) => {
    let tempArr = []
    const promises = data.content.map(function (team) {
      //team = {"authority": "PRESIDENT", "registerPeriod": 1, "teamId": 7, "teamName": "test", "teamProfileImageUrl": "https://pawith.s3.ap-northeast-2.amazonaws.com/9ec9d1e9-ebde-4d59-b74d-b515b04c5d98.png"}
      tempArr.push(getTeamUser(team.teamId))
    })
    await Promise.all(promises)
  }
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
    setTodoData(response.data.content) //{"content": [{"status": "INCOMPLETE", "task": "test", "todoId": 6145}, {"status": "INCOMPLETE", "task": "test", "todoId": 6146}, {"status": "INCOMPLETE", "task": "test", "todoId": 6147}, {"status": "INCOMPLETE", "task": "test", "todoId": 6148}], "hasNext": false, "page": 0, "size": 10}
  }
  //getTeamUsers(data).then(() => console.log(data))
  const getDatas = () => {
    getTodoTeamList(0, 10).then((data) => {})
  }
  useEffect(() => {
    // getDatas()
    getTodos(1)
    // getTeamUser(1).then((res) => console.log(res))
  }, [])

  const calendarRef = useRef(null)
  const [category, setCategory] = useState('')
  const [month, setMonth] = useState(today.getMonth() + 1)
  const locale = {
    name: 'ko',
    config: {
      weekdays: '화수목금토일월',
    },
  }
  return (
    <ScreenLayout verticalOffset={statusBarHeight + 44} behavior="position">
      <ContentContainer>
        <TodoHeader navigation={navigation} />
        <ScrollView>
          <ContentBase>
            <NotificationBox>
              <TopContainer>
                <BodyBold_Text color={colors.grey_700}>{`지난주 보다 
목표 달성률이 떨어졌어요!`}</BodyBold_Text>
                <CloseButton>
                  <Close width={16} height={16} />
                </CloseButton>
              </TopContainer>
              <Detail_Text style={{ marginTop: 4, marginBottom: 24 }} color={colors.grey_500}>
                이번주 리포트를 더 자세히 함께 알아볼까요?
              </Detail_Text>
              <NotificationButton />
            </NotificationBox>
            <CalendarHeader>
              <MonthText>{month}월</MonthText>
              <ArrowContainer>
                <Arrow onPress={() => calendarRef.current.getPreviousWeek()}>
                  <Arrow_left width={28} height={28} />
                </Arrow>
                <Arrow onPress={() => calendarRef.current.getNextWeek()}>
                  <Arrow_right width={28} height={28} />
                </Arrow>
              </ArrowContainer>
            </CalendarHeader>
            <CalendarStrip
              ref={calendarRef}
              locale={locale}
              scrollable
              // daySelectionAnimation={true}
              style={{ height: 68 }}
              selectedDate={today}
              // markedDates={markedDate}
              highlightDateNumberContainerStyle={{
                backgroundColor: colors.primary_container,
                borderRadius: 4,
              }}
              // scrollerPaging //논의 필요
              calendarHeaderContainerStyle={{ height: 0 }}
              onWeekChanged={(a, b) => {
                setMonth(b.month() + 1)
              }}
              dateNameStyle={{ color: colors.grey_500, fontFamily: 'Spoqa-Medium', fontSize: 12, marginBottom: 4 }}
              highlightDateNameStyle={{
                color: colors.grey_500,
                fontFamily: 'Spoqa-Medium',
                fontSize: 12,
                marginBottom: 4,
              }}
              dateNumberStyle={{
                color: colors.grey_800,
                fontFamily: 'Spoqa-Medium',
                fontSize: 12,
                padding: 12,
                margin: -5,
              }}
              highlightDateNumberStyle={{
                color: colors.grey_800,
                fontFamily: 'Spoqa-Medium',
                fontSize: 12,
                padding: 12,
                margin: -5,
              }}
              leftSelector={[]}
              rightSelector={[]}
            />
            <Divider />
            <TodoListHeader>
              <BodyBoldSm_Text color={colors.grey_800}>8월 19일 목요일</BodyBoldSm_Text>
              <TodayButton onPress={() => calendarRef.current.setSelectedDate(today)}>
                <Reset width={16} height={16} />
                <Detail_Text color={colors.grey_600} style={{ marginLeft: 4 }}>
                  오늘
                </Detail_Text>
              </TodayButton>
            </TodoListHeader>
            {/* <CategoryInputContainer style={{ width: category ? 32 + category.length * 16 : 190 }}> */}
            {!todoData && <NoItem />}
            <CategoryInputContainer style={{ width: 190 }}>
              <Circle style={{ backgroundColor: colors.primary }}></Circle>
              <CategoryInput
                autoCapitalize="none"
                placeholderTextColor={colors.grey_600}
                onSubmitEditing={() => Keyboard.dismiss()}
                placeholder="카테고리를 입력해주세요"
                returnKeyType="done"
                inputMode="text"
                blurOnSubmit={false}
                onChangeText={(text) => setCategory(text)}
              />
            </CategoryInputContainer>
            {todoData && todoData.map((data) => <TodoItem title={data.task} status={data.status} />)}
            <TodayButton
              style={{ marginTop: 32 }}
              onPress={() => {
                AsyncStorage.clear()
              }}
            >
              <BodyBold_Text color={colors.grey_400}>캐시 지우기</BodyBold_Text>
            </TodayButton>
            <TodayButton style={{ marginTop: 32 }} onPress={() => logout()}>
              <BodyBold_Text color={colors.grey_400}>로그아웃</BodyBold_Text>
            </TodayButton>
          </ContentBase>
        </ScrollView>
      </ContentContainer>
    </ScreenLayout>
  )
}
const CategoryInput = styled.TextInput`
  margin-left: 8px;
  font-family: Spoqa-Medium;
  font-size: 14px;
`
const ContentBase = styled.View`
  flex: 1;
`
const Circle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
`
const CategoryInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 190px;
  border-radius: 4px;
  padding: ${Platform.OS == 'android' ? '2px 8px' : '6px 8px'};
  border: 1px solid ${colors.grey_200};
  margin: 16px 0px;
`
const TodoListHeader = styled.View`
  height: 32px;
  margin: 16px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
const TopContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`
const CloseButton = styled.TouchableOpacity``
const CalendarHeader = styled.View`
  height: 28px;
  margin-top: 16px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`
const MonthText = styled.Text`
  color: ${colors.grey_700};
  font-family: 'Spoqa-Bold';
  font-size: 20px;
  padding-left: 8px;
`
const ArrowContainer = styled.View`
  width: 64px;
  flex-direction: row;
  justify-content: space-between;
`
const Arrow = styled.TouchableOpacity`
  background-color: 'chartreuse';
`
const Divider = styled.View`
  border-top-color: ${colors.grey_250};
  border-top-width: 2px;
`
const NotificationBox = styled.View`
  border-radius: 16px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8px;
  background-color: ${colors.blue_200};
`
