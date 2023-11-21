import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { ScreenLayout } from '../../components/Shared'
import { styled } from 'styled-components/native'
import ContentIcon from '../../assets/Svgs/chevron_right.svg'
import { colors } from '../../colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState } from 'recoil'
import { loggedInState } from '../../recoil/AuthAtom'
import { CommonActions, useIsFocused } from '@react-navigation/native'
import { TabBarAtom } from '../../recoil/TabAtom'

export default function Setting({ navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])
  const finishLogout = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken').then(setLoggedIn(false))
  }
  const logOut = async () => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: 'HomeNav' }],
      }),
    )
    finishLogout()
  }

  return (
    <ScreenLayout>
      <ContentContainer onPress={() => navigation.navigate('Account')}>
        <ContentText>계정</ContentText>
        <TouchableIcon>
          <ContentIcon width={16} height={16} color={colors.grey_450} />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer>
        <ContentText>포잇가이드</ContentText>
        <TouchableIcon>
          <ContentIcon width={16} height={16} color={colors.grey_450} />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer onPress={() => navigation.navigate('PrivacyTerms')}>
        <ContentText>개인정보처리방침</ContentText>
        <TouchableIcon>
          <ContentIcon width={16} height={16} color={colors.grey_450} />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer onPress={() => navigation.navigate('ServiceTerms')}>
        <ContentText>서비스 이용약관</ContentText>
        <TouchableIcon>
          <ContentIcon width={16} height={16} color={colors.grey_450} />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer>
        <ContentText>앱 정보</ContentText>
        <ContentText2>ver 1.0.0</ContentText2>
      </ContentContainer>
      <ContentContainer onPress={() => logOut()}>
        <ContentText>로그아웃</ContentText>
      </ContentContainer>
      <ContentContainer>
        <ContentText>공지사항</ContentText>
      </ContentContainer>
    </ScreenLayout>
  )
}

const ContentContainer = styled.TouchableOpacity`
  padding: 16px;
  padding-left: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const ContentText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 16px;
  line-height: 22px;
`
const ContentText2 = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
  color: ${colors.grey_450};
`

const TouchableIcon = styled.TouchableOpacity``
