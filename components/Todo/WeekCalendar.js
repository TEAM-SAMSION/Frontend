// import { addDays, format, getDate, startOfWeek } from 'date-fns'
// import React, { useEffect, useState } from 'react'
// import { Text, View } from 'react-native'
// import { ScreenWidth } from '../Shared'
// import styled from 'styled-components/native'
// import { colors } from '../../colors'

// export default WeekCalendar = ({ date }) => {
//   const [week, setWeek] = useState([])
//   useEffect(() => {
//     const weekDays = getWeekDays(date)
//     console.log(weekDays)
//     setWeek(weekDays)
//   }, [date]) //date가 변경될 경우(12시에), 달력이 재렌더되지 않는 문제 해결하고자 dep에 추가

//   return (
//     <DayContainer>
//       {week?.map((weekDay) => {
//         return (
//           <DayItem key={weekDay.formatted}>
//             <DayItemText>{weekDay.formatted}</DayItemText>
//           </DayItem>
//         )
//       })}
//     </DayContainer>
//   )
// }

// export const getWeekDays = (date) => {
//   const start = startOfWeek(date, { weekStartsOn: 1 })
//   //인자로 받은 날이 속한 주의 첫번째 날을 반환
//   //첫번째 날의 기준이 월요일임을 전달하기 위해 'weekStartsOn: 1'인자를 2번째로 전달

//   const final = []
//   for (var i = 0; i < 7; i++) {
//     const date = addDays(start, i)
//     //다음 양식에 맞춰 객체를 배열에 추가
//     final.push({
//       formatted: format(date, 'EEE'),
//       date,
//       day: getDate(date),
//     })
//   }
//   return final
// }

// const DayContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
// `
// const DayItem = styled.View`
//   padding: 12px;
//   background-color: ${colors.grey_150};
// `
// const DayItemText = styled.Text`
//   color: #747474;
// `
