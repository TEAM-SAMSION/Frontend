import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScreenHeight, ScreenLayout, ScreenWidth, normalize } from '../../components/Shared'
import { styled } from 'styled-components/native'
import { TopHeader } from '../../components/MyPage/TopHeader'
import { FlatList, Platform, Pressable, RefreshControl, TouchableWithoutFeedback } from 'react-native'
import GroupBox from '../../components/MyPage/GroupBox'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import EditIcon from '../../assets/Svgs/Edit.svg'
import 'react-native-gesture-handler'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { ModalPopUp } from '../../components/Shared'
import { colors } from '../../colors'
import { deleteTeam, getTeamDeleteValidation, getPeriod, getTeamList, getUserInfo } from '../../components/MyPage/Apis'
import {
  BodyBoldSm_Text,
  BodyBold_Text,
  BodySm_Text,
  Body_Text,
  DetailSm_Text,
  Detail_Text,
  SubHead_Text,
} from '../../components/Fonts'
import { TabBarAtom } from '../../recoil/TabAtom'
import { useIsFocused } from '@react-navigation/native'
import ErrorIcon from '../../assets/Svgs/error.svg'
import CloseIcon from '../../assets/Svgs/Close.svg'
import Home from '../../assets/Svgs/Home.svg'
import Logo from '../../assets/Svgs/LOGO_Symbol.svg'
import MyPage from '../../assets/Svgs/Mypage.svg'
import About1 from '../../assets/Svgs/about1.svg'
import SettingIcon from '../../assets/Svgs/SettingIcon.svg'

export default function TuMyPage4({ navigation }) {
  const isFocused = useIsFocused()
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const setIsTabVisible = useSetRecoilState(TabBarAtom)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused])

  const [name, setName] = useState('펫모리')
  const [email, setEmail] = useState('이메일')
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/default_user.png',
  )

  const swipeableRefs = useRef(null)
  const [groupInfo, setGroupInfo] = useState([
    {
      id: 0,
      teamName: '모임이름',
      registerPeriod: 2,
      teamProfileImageUrl: 'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/sample_5.png',
      authority: 'PRESIDENT',
    },
    {
      id: 0,
      teamName: '모임이름',
      registerPeriod: 4,
      teamProfileImageUrl: 'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/sample_10.png',
      authority: 'EXECUTIVE',
    },
    {
      id: 0,
      teamName: '모임이름',
      registerPeriod: 6,
      teamProfileImageUrl: 'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/sample_9.png',
      authority: 'MEMBER',
    },
    {
      id: 0,
      teamName: '모임이름',
      registerPeriod: 8,
      teamProfileImageUrl: 'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/sample_4.png',
      authority: 'MEMBER',
    },
  ])

  return (
    <ScreenLayout>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          navigation.navigate('TuMyPage5')
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
              position: 'absolute',
              top: 4,
              right: 5,
              borderWidth: 4,
              borderRadius: 99,
              borderColor: colors.primary_outline,
            }}
          >
            <EditBox style={{ width: 36, height: 36 }}>
              <SettingIcon width={24} height={24} />
            </EditBox>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 22,
              right: 60,
              alignItems: 'flex-end',
            }}
          >
            <About1 widwth={20} hieght={20} />
            <View style={{ marginTop: 4 }}>
              <Body_Text color={colors.red_200} style={{ textAlign: 'right' }}>
                아이콘을 클릭하여
              </Body_Text>
              <Body_Text color={colors.red_200}>세부적인 설정을 확인할 수 있어요</Body_Text>
            </View>
          </View>
        </View>
        <TopHeader navigation={navigation} />
        <TouchableWithoutFeedback
          onPress={() => {
            swipeableRefs.current?.close()
          }}
        >
          <View>
            <UserContainer>
              <UserDetailContainer>
                <ProfileImage
                  source={{
                    uri: `${profileUrl}`,
                  }}
                />
                <UserBox>
                  <SubHead_Text>{name}</SubHead_Text>
                  <BodySm_Text color={colors.grey_450}>{email}</BodySm_Text>
                </UserBox>
              </UserDetailContainer>
              <EditBox onPress={() => navigation.navigate('EditUserInfo', { profileUrl, name, email })}>
                <EditIcon width={20} height={20} color={'#4D4D4D'} />
              </EditBox>
            </UserContainer>
            <GroupContainer>
              <Title>내가 속한 Pamily</Title>
              {groupInfo.length == 0 ? (
                <NoneGroupBox>
                  <DogIcon source={require(`../../assets/Imgs/DogDefault.png`)} />
                  <BodyBoldSm_Text color={colors.grey_400}>소속된 Pamily가 없습니다.</BodyBoldSm_Text>
                  <ButtonContainer>
                    <ButtonBox onPress={() => navigation.navigate('HomeNav', { screen: 'JoinTeam' })}>
                      <BodySm_Text color={colors.red_350}>참여하기</BodySm_Text>
                    </ButtonBox>
                    <ButtonBox onPress={() => navigation.navigate('HomeNav', { screen: 'CreateTeam' })}>
                      <BodySm_Text color={colors.red_350}>생성하기</BodySm_Text>
                    </ButtonBox>
                  </ButtonContainer>
                </NoneGroupBox>
              ) : (
                <Groups>
                  <FlatList
                    data={groupInfo}
                    renderItem={({ item }) => {
                      return (
                        <GroupBox
                          data={item}
                          handleDelete={() => {}}
                          gotoAdminNav={() =>
                            navigation.navigate('AdministratorNav', { screen: 'AdminHome', params: { item } })
                          }
                          onSwipeableOpenHandler={(ref) => {
                            if (swipeableRefs.current && ref !== swipeableRefs.current) {
                              swipeableRefs.current.close()
                              swipeableRefs.current = null
                            }
                            swipeableRefs.current = ref
                          }}
                        />
                      )
                    }}
                  />
                </Groups>
              )}
            </GroupContainer>
            <FooterContainer>
              <Detail_Text color={'#A09999'}>
                포잇에 대해 더 알아볼까요?{'\n'}좀 더 똑똑하게 포잇을 사용하고 싶다면?
              </Detail_Text>
              <Guide>포잇가이드</Guide>
            </FooterContainer>
          </View>
        </TouchableWithoutFeedback>
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
          onPress={() => navigation.navigate('HomeNav')}
        >
          <CloseIcon width={36} height={36} color={colors.grey_200} />
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  )
}

const UserContainer = styled.View`
  padding: 12px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const ProfileImage = styled.Image`
  width: 78px;
  height: 78px;
  border-radius: 16px;
`
const UserDetailContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`
const UserBox = styled.View`
  justify-content: center;
  gap: 4px;
`
const EditBox = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background-color: ${colors.grey_150};
  border-radius: 99px;
  justify-content: center;
  align-items: center;
`
const GroupContainer = styled.View`
  padding: 12px 0px 0px 0px;
  gap: 12px;
`
const Title = styled.Text`
  font-family: 'Spoqa-Bold';
  padding: 0px 20px;
  font-size: 20px;
  line-height: 28px;
`
const Groups = styled.View`
  gap: 12px;
  margin-bottom: 8px;
`
const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 12px 24px;
`
const Guide = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
  text-decoration-line: underline;
  color: ${colors.grey_500};
`
/////////////
const PopContent = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 57px;
  margin-bottom: 49px;
`
const PopTitle = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 16px;
  line-height: 22px;
  color: ${colors.grey_800};
`
const PopButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
const PopButton = styled.TouchableOpacity`
  display: flex;
  flex: 1 0 0;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.red_200};
`
const PopButtonText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
  color: ${colors.red_350};
`
const PopTitleBox = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`
const NoneGroupBox = styled.View`
  display: flex;
  margin: 0px 16px;
  border-radius: 16px;
  padding: 125px 0px 8px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: ${colors.grey_150};
`
const ButtonContainer = styled.View`
  flex-direction: row;
  margin: 0px 12px;
  gap: 8px;
`
const ButtonBox = styled.TouchableOpacity`
  display: flex;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  background-color: ${colors.grey_100};
  border-radius: 8px;
`
const DogIcon = styled.Image`
  position: absolute;
  width: 160px;
  height: 160px;
  top: 0;
  z-index: -1;
`
const ErrorBox = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${colors.primary_outline};
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;
`
const MessageBox = styled.View`
  gap: 4px;
  align-items: center;
  justify-content: center;
`
const PopUpContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 28px 0px 44px 0px;
`
const TextBox = styled.View`
  align-items: center;
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
