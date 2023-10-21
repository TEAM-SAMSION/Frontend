import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'

import CalendarStrip from 'react-native-calendar-strip'
import Arrow_left from '../../assets/Svgs/arrow_left.svg'
import Arrow_right from '../../assets/Svgs/arrow_right.svg'
import Reset from '../../assets/Svgs/Reset.svg'

import { BodyBoldSm_Text, Detail_Text } from '../Fonts'

export const MyCalendarStrip = () => {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth() + 1)
  const locale = { name: 'ko', config: { weekdays: '화수목금토일월' } } // const markedDate = [{ date: today,dots: [ {color: 'red' },],} ]

  const calendarRef = useRef(null)
  return (
    <>
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
    </>
  )
}

const TopContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`
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