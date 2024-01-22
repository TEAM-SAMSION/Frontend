import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, Platform, Pressable, ScrollView, TouchableOpacity, View } from 'react-native'
import { ScreenHeight, ScreenLayout, ScreenWidth, normalize } from '../../components/Shared'
import { TopHeader } from '../../components/Home/TopHeader'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { PamilyChoiceToggle } from '../../components/Home/PamilyChoiceToggle'
import { MainImage } from '../../components/Home/MainImage'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useIsFocused } from '@react-navigation/native'
import { SelectedTeamAtom, TabBarAtom } from '../../recoil/TabAtom'
import { Body_Text, DetailSm_Text } from '../../components/Fonts'
import CloseIcon from '../../assets/Svgs/Close.svg'
import Home from '../../assets/Svgs/Home.svg'
import Logo from '../../assets/Svgs/LOGO_Symbol.svg'
import MyPage from '../../assets/Svgs/Mypage.svg'

export default function TuHome1({ navigation }) {
  const isFocused = useIsFocused()
  const setIsTabVisible = useSetRecoilState(TabBarAtom)
  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused])

  const [name, setName] = useState('펫모리')
  const [pamilyList, setPamilyList] = useState([])
  const [progress, setProgress] = useState(0)
  const [pamilyNum, setPamilyNum] = useState(0)
  const [isDog, setIsDog] = useState(true)

  const [selectedTeam, setSelectedTeam] = useRecoilState(SelectedTeamAtom)

  return (
    <ScreenLayout>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          navigation.navigate('TuHome2')
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
              borderRadius: 8,
              backgroundColor: colors.grey_100,
              padding: 16,
              gap: 4,
              left: 16,
              top: 52 + 398 + 24,
              width: (ScreenWidth - 40) / 2,
              height: 159,
              borderWidth: 4,
              borderColor: colors.primary_outline,
            }}
          >
            <Title>Pamily 생성하기</Title>
            <SubTitle>
              TODO를 함께할{'\n'}
              Pamily를 생성해 볼까요?
            </SubTitle>
            <StartIcon>
              <Image source={require('../../assets/Imgs/joinPaw.png')} style={{ width: 70, height: 70 }} />
            </StartIcon>
          </View>
          <View style={{ top: 52 + 398 - 159 - 24, alignItems: 'center' }}>
            <Body_Text color={colors.red_200}>클릭하여 새로운 Pamily를 생성할 수 있어요!</Body_Text>
          </View>
        </View>
        <TopHeader navigation={navigation} />
        <BannerContainer>
          <NickBox>
            <NicknameContainer>
              <NickText>{name} </NickText>
              <NickSubText>님,</NickSubText>
            </NicknameContainer>
            <SubText>오늘도 포잇과 함께 마이펫을 관리해볼까요?</SubText>
          </NickBox>
          <PamilyContainer>
            <PamilyChoiceToggle pamilyList={pamilyList} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
            <MainImage isDog={isDog} progress={progress} pamilyNum={pamilyNum} />
            <PamilyStatContainer>
              <NoneText>소속된 Pamily가 없습니다</NoneText>
            </PamilyStatContainer>
          </PamilyContainer>
        </BannerContainer>
        <TeamContainer>
          <StartTeamContainer
            style={
              Platform.OS == 'android'
                ? { elevation: 0.5, borderWidth: 0.7, borderColor: 'rgba(0, 0, 0, 0.01)' }
                : {
                    shadowColor: 'rgb(0,0,0)',
                    shadowRadius: 2,
                    shadowOpacity: 0.15,
                    shadowOffset: [0, 0],
                  }
            }
          >
            <Title>Pamily 생성하기</Title>
            <SubTitle>
              TODO를 함께할{'\n'}
              Pamily를 생성해 볼까요?
            </SubTitle>
            <StartIcon>
              <Image source={require('../../assets/Imgs/joinPaw.png')} style={{ width: 70, height: 70 }} />
            </StartIcon>
          </StartTeamContainer>
          <StartTeamContainer
            style={
              Platform.OS == 'android'
                ? { elevation: 0.5, borderWidth: 0.7, borderColor: 'rgba(0, 0, 0, 0.01)' }
                : {
                    shadowColor: 'rgb(0,0,0)',
                    shadowRadius: 2,
                    shadowOpacity: 0.15,
                    shadowOffset: [0, 0],
                  }
            }
          >
            <Title>Pamily 참여하기</Title>
            <SubTitle>TODO를 함께할{'\n'}Pamily에 참여해 볼까요?</SubTitle>
            <StartIcon>
              <Image source={require('../../assets/Imgs/CreatePaw.png')} style={{ width: 70, height: 70 }} />
            </StartIcon>
          </StartTeamContainer>
        </TeamContainer>
        <BottomNav>
          <Tab>
            <Home style={{ color: colors.primary_outline }} width={24} height={24} />
            <DetailSm_Text color={colors.primary_outline} style={{ marginTop: 4 }}>
              홈
            </DetailSm_Text>
          </Tab>
          <Tab>
            <Logo style={{ color: colors.grey_250 }} width={65} height={65} />
          </Tab>
          <Tab>
            <MyPage style={{ color: colors.grey_250 }} width={24} height={24} />
            <DetailSm_Text color={colors.grey_250} style={{ marginTop: 4 }}>
              마이페이지
            </DetailSm_Text>
          </Tab>
        </BottomNav>
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

const BannerContainer = styled.View`
  height: 398px;
  padding: 24px 16px;
  background-color: ${colors.primary_container};
`
const NicknameContainer = styled.View`
  flex-direction: row;
`
const NickBox = styled.View`
  padding-left: 8px;
`
const NickText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 22px;
  line-height: 30px;
  color: ${colors.primary_outline};
`
const NickSubText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 22px;
  line-height: 30px;
`
const SubText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 16px;
  line-height: 22px;
  color: ${colors.grey_600};
`
const PamilyContainer = styled.View`
  height: 274px;
  border-radius: 16px;
  border: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 24px;
`
const PamilyStatContainer = styled.View`
  width: 100%;
  height: 62px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 16px;
  position: absolute;
  z-index: 1;
  top: 210px;
`
const NoneText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
  color: ${colors.grey_400};
`
const TeamContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 16px 16px 16px;
  gap: 12px;
`
const StartTeamContainer = styled.TouchableOpacity`
  //width: 170px;
  flex: 1;
  height: 159px;
  border-radius: 8px;
  background-color: ${colors.grey_100};
  padding: 16px 16px 0px 16px;
  gap: 4px;
`
const Title = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
`
const SubTitle = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 12px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.6);
`
const StartIcon = styled.View`
  position: absolute;
  right: 12px;
  bottom: 0;
`
const BottomNav = styled.View`
  width: ${ScreenWidth};
  position: absolute;
  bottom: 0;
  flex-direction: row;
  display: flex;
  align-items: center;
  height: ${Platform.OS == 'android' ? 68 : 88};
  padding-top: ${Platform.OS == 'android' ? 0 : normalize(16)};
`
const Tab = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1 0 0;
`
