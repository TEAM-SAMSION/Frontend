import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, ScrollView, StatusBar, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { HeaderWithBack, ScreenHeight, ScreenLayout, ScreenWidth } from '../../components/Shared'

import Alarm from '../../assets/Svgs/Alarm'
import NoAlarm from '../../assets/Imgs/NoAlarm.png'
import { BodySm_Text, DetailSm_Text, Detail_Text, SubHead_Text } from '../../components/Fonts'
import { getAlarms } from '../../components/Todo/Apis'
import { useRecoilState } from 'recoil'
import { useIsFocused } from '@react-navigation/native'
import { TabBarAtom } from '../../recoil/TabAtom'

export const Alarms = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)
  const [pageNum, setPageNum] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [alarmList, setAlarmList] = useState([])

  const loadMore = async () => {
    const newTodoList = await getAlarms(pageNum + 1)
    setAlarmList((prevTodoList) => [...prevTodoList, ...newTodoList])
    setPageNum((prevTodoPage) => prevTodoPage + 1)
  }

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getAlarms(0).then((data) => {
      if (data.length > 0) {
        setAlarmList(data)
      } else {
        setAlarmList(null)
      }
    })
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  useEffect(() => {
    getAlarms().then((data) => {
      if (data.length > 0) {
        setAlarmList(data)
      } else {
        setAlarmList(null)
      }
    })
  }, [])
  const renderItem = ({ item }) => (
    <AlarmBase style={{ borderBottomWidth: 1, borderBottomColor: colors.outline }}>
      <AlarmIcon>
        <Alarm width={28} height={28} color={item.type == 'TODO' ? colors.primary_outline : colors.secondary} />
      </AlarmIcon>
      <AlarmTextContainer>
        <BodySm_Text color={colors.grey_600}>{item.message}</BodySm_Text>
        <DetailSm_Text color={colors.grey_400}>{elapsedTime(item.createdAt)}</DetailSm_Text>
      </AlarmTextContainer>
    </AlarmBase>
  )

  const elapsedTime = (date) => {
    const now = new Date()
    const receivedTime = new Date(date)
    const elapsedTime = now.getTime() - receivedTime.getTime()
    const elapsedFormattedTime =
      elapsedTime > 60 * 60 * 1000
        ? `${Math.floor(elapsedTime / (1000 * 60 * 60))}시간 전`
        : `${Math.floor(elapsedTime / (1000 * 60))}분 전`

    return elapsedFormattedTime
  }
  return (
    //** ScrollView는 직접 Height 조정 불가능하기에, 바깥 부모를 통해 조정해야한다. */
    <ScreenContainer>
      <StatusBar />
      <HeaderWithBack navigation={navigation} title="알림" />
      {/* <FilterBase>
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
      </FilterBase> */}
      <ContentBase>
        <FlatList
          style={{ flexDirection: 'column', width: ScreenWidth }}
          contentContainerStyle={{ justifyContent: 'start', flex: 1 }}
          data={alarmList}
          renderItem={renderItem}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
          onEndReached={loadMore}
          onEndReachedThreshold={1}
          showsVerticalScrollIndicator={false}
        />
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: '100%', justifyContent: 'start', flex: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}
        >
          {alarmList ? (
            alarmList.map((item, id) => {
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
                    <BodySm_Text color={colors.grey_600}>{item.message}</BodySm_Text>
                    <DetailSm_Text color={colors.grey_400}>{elapsedTime(item.createdAt)}</DetailSm_Text>
                  </AlarmTextContainer>
                </AlarmBase>
              )
            })
          ) : (
            <ContentBase>
              <NoAlarmImg source={NoAlarm} />
              <SubHead_Text color={colors.grey_400}>알림이 없습니다</SubHead_Text>
              <RefreshButton onPress={() => getAlarmList()}>
                <BodySm_Text color={colors.primary_outline}>새로고침</BodySm_Text>
              </RefreshButton>
            </ContentBase>
          )}
        </ScrollView> */}
      </ContentBase>
    </ScreenContainer>
  )
}
const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${colors.grey_100};
`
const RefreshButton = styled.TouchableOpacity``
const MateItem = styled.TouchableOpacity`
  margin-right: 4px;
  padding: 10px 16px;
  border-radius: 99px;
  height: 35px;
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
  margin-left: 16px;
  flex: 1;
`
