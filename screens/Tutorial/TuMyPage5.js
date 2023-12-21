import React, { useEffect } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { ScreenHeight, ScreenLayout, ScreenWidth } from '../../components/Shared'
import { styled } from 'styled-components/native'
import ContentIcon from '../../assets/Svgs/chevron_right.svg'
import { colors } from '../../colors'
import { useRecoilState } from 'recoil'
import { useIsFocused } from '@react-navigation/native'
import { SelectedTeamAtom, TabBarAtom } from '../../recoil/TabAtom'
import { LogOut } from '../../utils/customAxios'
import BackButton from '../../assets/Svgs/chevron_back.svg'
import { BodyBold_Text, Body_Text } from '../../components/Fonts'
import CloseIcon from '../../assets/Svgs/Close.svg'

export default function TuMypage5({ navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)
  const [selectedTeam, setSelectedTeam] = useRecoilState(SelectedTeamAtom)

  const handleLogout = () => {
    setSelectedTeam(null)
    LogOut()
  }
  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  return (
    <ScreenLayout>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          navigation.navigate('TuAdmin1')
        }}
      >
        <View
          style={{
            width: ScreenWidth,
            height: ScreenHeight,
            backgroundColor: 'rgba(8, 7, 7, 0.75)',
            position: 'absolute',
            zIndex: 99,
          }}
        >
          <View
            style={{
              padding: 16,
              paddingLeft: 20,
              paddingRight: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.grey_100,
              borderWidth: 4,
              borderColor: colors.primary_outline,
              top: 106 - 4,
            }}
          >
            <ContentText>포잇가이드</ContentText>
            <TouchableIcon>
              <ContentIcon width={16} height={16} color={colors.grey_450} />
            </TouchableIcon>
          </View>
          <View style={{ position: 'absolute', bottom: 180, width: ScreenWidth, alignItems: 'center' }}>
            <Body_Text color={colors.red_200}>포잇가이드에서</Body_Text>
            <Body_Text color={colors.red_200}>포잇의 모든 기능을 확인할 수 있어요</Body_Text>
          </View>
        </View>
        <TopNav>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BackButton width={24} height={24} />
          </TouchableOpacity>
          <BodyBold_Text color={colors.grey_600}>설정</BodyBold_Text>
          <View style={{ width: 24 }}></View>
        </TopNav>
        <ContentContainer>
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
        <ContentContainer>
          <ContentText>개인정보처리방침</ContentText>
          <TouchableIcon>
            <ContentIcon width={16} height={16} color={colors.grey_450} />
          </TouchableIcon>
        </ContentContainer>
        <ContentContainer>
          <ContentText>서비스 이용약관</ContentText>
          <TouchableIcon>
            <ContentIcon width={16} height={16} color={colors.grey_450} />
          </TouchableIcon>
        </ContentContainer>
        <ContentContainer>
          <ContentText>앱 정보</ContentText>
          <ContentText2>ver 1.0.0</ContentText2>
        </ContentContainer>
        <ContentContainer>
          <ContentText style={{ color: colors.primary_outline }}>로그아웃</ContentText>
        </ContentContainer>
      </Pressable>
      <View style={{ position: 'absolute', bottom: 52, left: ScreenWidth / 2 - 30, zIndex: 100 }}>
        <TouchableOpacity
          style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.navigate('AuthBridge')}
        >
          <CloseIcon width={36} height={36} color={colors.grey_200} />
        </TouchableOpacity>
      </View>
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
  color: ${colors.grey_700};
`
const ContentText2 = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
  color: ${colors.grey_450};
`

const TouchableIcon = styled.TouchableOpacity``
const TopNav = styled.View`
  flex-direction: row;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  margin: 0 16px;
`
