import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { HeaderWithBack, ScreenLayout } from '../../components/Shared'

import Alarm from '../../assets/Svgs/Alarm'
import NoAlarm from '../../assets/Imgs/NoAlarm.png'
import { BodySm_Text, DetailSm_Text, Detail_Text, SubHead_Text } from '../../components/Fonts'

export const Alarms = ({ navigation }) => {
  let items = ['전체', 'TODO', '공지사항']
  const [selectedId, setSelectedId] = useState(0)
  //   const [alarmList, setAlarmList] = useState(null)
  let alarmList = [
    { name: '오늘 할당된 000을 아직 완료하지 않았군요!', time: '1시간전', type: 'TODO' },
    { name: '오늘 할당된 000을 아직 완료하지 않았군요!', time: '2시간전', type: '공지사항' },
    { name: '오늘 할당된 000을 아직 완료하지 않았군요!', time: '3시간전', type: '공지사항' },
    { name: '오늘 할당된 000을 아직 완료하지 않았군요!', time: '6시간전', type: 'TODO' },
  ]
  return (
    //** ScrollView는 직접 Height 조정 불가능하기에, 바깥 부모를 통해 조정해야한다. */
    <ScreenLayout color={colors.grey_100}>
      <HeaderWithBack navigation={navigation} title="알림" />
      <FilterBase>
        <ScrollView horizontal contentContainerStyle={{ marginLeft: 24 }}>
          {items.map((item, id) => {
            return (
              <MateItem
                onPress={() => setSelectedId(id)}
                key={id}
                style={{ backgroundColor: id == selectedId ? colors.grey_700 : colors.grey_150 }}
              >
                <Detail_Text color={id == selectedId ? colors.grey_100 : colors.grey_500}>{item}</Detail_Text>
              </MateItem>
            )
          })}
        </ScrollView>
      </FilterBase>
      <ContentBase>
        {alarmList ? (
          <ScrollView>
            {alarmList.map((item, id) => {
              return (
                <AlarmBase style={{ borderBottomWidth: 1, borderBottomColor: colors.outline }}>
                  <AlarmIcon>
                    <Alarm
                      width={28}
                      height={28}
                      color={item.type == 'TODO' ? colors.primary_outline : colors.secondary}
                    />
                  </AlarmIcon>
                  <AlarmTextContainer>
                    <BodySm_Text color={colors.grey_600}>{item.name}</BodySm_Text>
                    <DetailSm_Text color={colors.grey_400}>{item.time}</DetailSm_Text>
                  </AlarmTextContainer>
                </AlarmBase>
              )
            })}
          </ScrollView>
        ) : (
          <>
            <NoAlarmImg source={NoAlarm} />
            <SubHead_Text color={colors.grey_400}>알림이 없습니다</SubHead_Text>
            <RefreshButton onPress={() => console.log('Pressed')}>
              <BodySm_Text color={colors.primary_outline}>새로고침</BodySm_Text>
            </RefreshButton>
          </>
        )}
      </ContentBase>
    </ScreenLayout>
  )
}

const MateItem = styled.TouchableOpacity`
  margin-right: 4px;
  padding: 10px 16px;
  border-radius: 99px;
  height: 35px;
`
const HeaderContainer = styled.View`
  width: 100%;
  height: 52px;
  align-items: center;
  justify-content: center;
`
const FilterBase = styled.View`
  padding-top: 8px;
  padding-bottom: 12px;
  background-color: ${colors.grey_100};
`
const NoAlarmImg = styled.Image`
  width: 186px;
  height: 172px;
  margin-top: -32px;
`
const AlarmIcon = styled.View`
  width: 48px;
  border-color: ${colors.outline};
  border-width: 1px;
  border-radius: 8px;
  height: 48px;
  align-items: center;
  justify-content: center;
`
const ContentBase = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey_150};
  flex: 1;
`
const AlarmBase = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 16px 24px;
  justify-content: space-between;
  background-color: ${colors.grey_100};
`
const AlarmTextContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  gap: inherit;
  margin-left: 16px;
  flex: 1;
`
const RefreshButton = styled.TouchableOpacity``
