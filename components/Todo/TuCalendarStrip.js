import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'

import CalendarStrip from 'react-native-calendar-strip'
import Arrow_left from '../../assets/Svgs/arrow_left.svg'
import Arrow_right from '../../assets/Svgs/arrow_right.svg'
import Reset from '../../assets/Svgs/Reset.svg'

import { BodyBoldSm_Text, Detail_Text, SubHeadSm_Text } from '../Fonts'

export const TuCalendarStrip = ({ selectedDate, setSelectedDate }) => {
  //2023-11-20
  let today = new Date()
  const [month, setMonth] = useState(selectedDate.substring(5, 7))
  const [customDay, setCustomDay] = useState(today.getDay())
  const locale = { name: 'ko', config: { weekdays: '화수목금토일월' } } // const markedDate = [{ date: today,dots: [ {color: 'red' },],} ]
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const calendarRef = useRef(null)
  return (
    <>
      <CalendarHeader>
        <SubHeadSm_Text color={colors.grey_700}>{month}월</SubHeadSm_Text>
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
        onDateSelected={(date) => {
          setSelectedDate(date.format('YYYY-MM-DD'))
          setCustomDay(date.format('d'))
        }}
        style={{ height: 68 }}
        selectedDate={new Date()} //** 실제 렌더링에서의 성능체감 */
        highlightDateNumberContainerStyle={{
          backgroundColor: colors.primary_container,
          borderRadius: 4,
        }}
        scrollerPaging //논의 필요
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
          margin: -6,
        }}
        highlightDateNumberStyle={{
          color: colors.primary,
          fontFamily: 'Spoqa-Medium',
          fontSize: 12,
          padding: 12,
          margin: -6,
        }}
        leftSelector={[]}
        rightSelector={[]}
      />
      <Divider />
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
  height: 32px;
  border-radius: 99px;
  display: inline-block;
`
