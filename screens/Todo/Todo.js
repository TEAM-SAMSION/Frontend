import React, { useRef, useState } from 'react'

import { ScreenKeyboardLayout, ScreenLayout } from '../../components/Shared'
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
import { Keyboard, NativeModules, Platform, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default Todo = ({ navigation }) => {
  const { StatusBarManager } = NativeModules

  const [statusBarHeight, setStatusBarHeight] = useState(0)
  Platform.OS == 'ios'
    ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      })
    : null

  const today = new Date()
  const markedDate = [
    {
      date: today,
      dots: [
        {
          color: 'red',
        },
      ],
    },
  ]

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
    <ScreenKeyboardLayout verticalOffset={statusBarHeight + 44} behavior="position">
      <ContentContainer>
        <TodoHeader navigation={navigation} />
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
            // console.log(a.set('date', a.date() + 3))
            setMonth(b.month() + 1)
          }}
          dateNameStyle={{ color: colors.grey_500, fontFamily: 'Spoqa-Medium', fontSize: 12, marginBottom: 4 }}
          highlightDateNameStyle={{ color: colors.grey_500, fontFamily: 'Spoqa-Medium', fontSize: 12, marginBottom: 4 }}
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
        <NoSchedule>
          <BodySm_Text color={colors.grey_600}>오늘은 예정된 일정이 없어요.</BodySm_Text>
          <DetailSm_Text color={colors.grey_400}>우측 상단 캘린더 버튼을 클릭하여 일정을 기록해보세요.</DetailSm_Text>
        </NoSchedule>
        {/* <CategoryInputContainer style={{ width: category ? 32 + category.length * 16 : 190 }}> */}
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
        <TodayButton
          style={{ marginTop: 32 }}
          onPress={() => {
            AsyncStorage.clear()
          }}
        >
          <BodyBold_Text color={colors.grey_400}>캐시 지우기</BodyBold_Text>
        </TodayButton>
      </ContentContainer>
    </ScreenKeyboardLayout>
  )
}
const CategoryInput = styled.TextInput`
  margin-left: 8px;
  font-family: Spoqa-Medium;
  font-size: 14px;
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
  margin-top: 16px;
`
const TodoListHeader = styled.View`
  height: 32px;
  margin: 16px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const NoSchedule = styled.View`
  padding: 20px 16px;
  border-radius: 8px;
  display: inline-block;
  background-color: ${colors.grey_150};
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
