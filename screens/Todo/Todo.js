import React, { useRef, useState } from 'react'

import { ScreenLayout } from '../../components/Shared'
import CalendarStrip from 'react-native-calendar-strip'
import { colors } from '../../colors'
import styled from 'styled-components/native'
import Arrow_left from '../../assets/Svgs/arrow_left.svg'
import Arrow_right from '../../assets/Svgs/arrow_right.svg'
import { TodoHeader } from '../../components/Todo/TodoHeader'

export default Todo = ({ navigation }) => {
  const today = new Date()
  const calendarRef = useRef(null)
  const [month, setMonth] = useState(today.getMonth() + 1)
  const locale = {
    name: 'ko',
    config: {
      weekdays: '화수목금토일월',
    },
  }

  return (
    <ScreenLayout>
      <TodoHeader navigation={navigation} />
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
        style={{ height: 68, padding: 16 }}
        // scrollerPaging //논의 필요
        calendarHeaderContainerStyle={{ height: 0 }}
        onWeekChanged={(a) => setMonth(a.month() + 1)}
        dateNameStyle={{ color: colors.grey_500, fontFamily: 'Spoqa-Medium', fontSize: 12 }}
        dateNumberStyle={{ color: colors.grey_800, fontFamily: 'Spoqa-Medium', fontSize: 12, marginTop: 12 }}
        leftSelector={[]}
        rightSelector={[]}
      />
      <Divider />
    </ScreenLayout>
  )
}

const CalendarHeader = styled.View`
  height: 28px;
  margin-top: 16px;
  width: 100%;
  flex-direction: row;
  padding: 0px 16px;
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
  margin: 0px 16px;
  height: 32px;
`
