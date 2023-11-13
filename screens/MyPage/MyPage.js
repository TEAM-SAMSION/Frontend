import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScreenLayout } from '../../components/Shared'
import { styled } from 'styled-components/native'
import { TopHeader } from '../../components/MyPage/TopHeader'
import { FlatList, Text } from 'react-native'
import GroupBox from '../../components/MyPage/GroupBox'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import EditIcon from '../../assets/Svgs/Edit.svg'
import axios from 'axios'
import { ProfileImageModal } from '../../components/MyPage/ProfileImageModal'
import { AccessTokenRequest, resolveDiscoveryAsync } from 'expo-auth-session'
import 'react-native-gesture-handler'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { ModalPopUp } from '../../components/Shared'
import { colors } from '../../colors'
import { deleteTeam, getTeamList, getUserInfo } from '../../components/MyPage/Apis'
import { BodyBoldSm_Text, BodySm_Text, Detail_Text, SubHead_Text } from '../../components/Fonts'
import { TabBarAtom } from '../../recoil/TabAtom'
import { useIsFocused } from '@react-navigation/native'

export default function MyPage({ navigation }) {
  const isFocused = useIsFocused()
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const setIsTabVisible = useSetRecoilState(TabBarAtom)

  useEffect(() => {
    isFocused && setIsTabVisible(true)
  }, [isFocused])

  const [name, setName] = useState('포잇')
  const [email, setEmail] = useState('pawith@gmail.com')
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/default_user.png',
  )

  const swipeableRefs = useRef([])

  const fetchUserInfo = () => {
    getUserInfo(ACCESSTOKEN).then((result) => {
      setEmail(result.email)
      setName(result.nickname)
      setProfileUrl(result.profileImageUrl)
    })
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const [groupInfo, setGroupInfo] = useState([
    {
      teamId: 74,
      teamProfileImageUrl: '../../assets/Svgs/ProfileDefault.svg',
      teamName: 'dummy1',
      authority: 'PRESIDENT',
      registerPeriod: 500,
    },
    {
      teamId: 75,
      teamProfileImageUrl: '../../assets/Svgs/ProfileDefault.svg',
      teamName: 'dummy2',
      authority: 'EXECUTIVE',
      registerPeriod: 700,
    },
  ])

  const fetchTeamList = async () => {
    getTeamList(ACCESSTOKEN).then((result) => {
      setGroupInfo(result)
    })
  }

  useEffect(() => {
    fetchTeamList()
  }, [isFocused])

  const [visible, setVisible] = useState(false)
  const [deleteTeamId, setDeleteTeamId] = useState('')
  const [deleteTeamName, setDeleteTeamName] = useState('')

  const deleteItem = async () => {
    console.log(deleteTeamId)
    await deleteTeam(ACCESSTOKEN, deleteTeamId)
    swipeableRefs.current[deleteTeamId]?.close()
    fetchTeamList()
  }

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['30%']
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
    [],
  )

  return (
    <BottomSheetModalProvider>
      <ScreenLayout>
        <TopHeader navigation={navigation} />
        <ScrollView>
          <UserContainer>
            <UserDetailContainer>
              <TouchableOpacity onPress={handlePresentModal}>
                <ProfileImage
                  source={{
                    uri: `${profileUrl}`,
                  }}
                />
              </TouchableOpacity>
              <UserBox>
                <SubHead_Text>{name}</SubHead_Text>
                <Detail_Text color={colors.grey_600}>{email}</Detail_Text>
              </UserBox>
            </UserDetailContainer>
            <EditBox>
              <EditIcon width={16} height={16} color={'#4D4D4D'} />
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
                        handleDelete={() => {
                          setDeleteTeamId(item.teamId)
                          setDeleteTeamName(item.teamName)
                          setVisible(true)
                        }}
                        gotoAdminNav={() => navigation.navigate('AdministratorNav')}
                        swipeableRef={(ref) => (swipeableRefs.current[item.teamId] = ref)}
                      />
                    )
                  }}
                />
              </Groups>
            )}
          </GroupContainer>
          <FooterContainer>
            <Detail_Text color={'A09999'}>
              포잇에 대해 더 알아볼까요?{'\n'}좀 더 똑똑하게 포잇을 사용하고 싶다면?
            </Detail_Text>
            <Guide>포잇가이드</Guide>
          </FooterContainer>
          <TouchableOpacity onPress={() => navigation.navigate('AdministratorNav')}>
            <Text style={{ color: colors.grey_800 }}>관리자페이지이동</Text>
          </TouchableOpacity>
        </ScrollView>
        {/* 팝업 */}
        <ModalPopUp visible={visible} petIcon={false} height={290}>
          <PopContent>
            <PopSubTitle>정말 Pamily를 나가시겠습니까?</PopSubTitle>
            <PopTitleBox>
              <PopTitle style={{ color: colors.primary_outline }}>{deleteTeamName}</PopTitle>
              <PopTitle>와 함께한 {name}님의 시간</PopTitle>
            </PopTitleBox>
          </PopContent>
          <DateContent
            style={{
              shadowColor: 'rgb(0,0,0)',
              shadowRadius: 2,
              shadowOpacity: 0.2,
              shadowOffset: [0, 0],
            }}
          >
            <DateText>24일</DateText>
          </DateContent>
          <PopButtonContainer>
            <PopButton
              onPress={() => {
                setVisible(false)
                //deleteItem()
                navigation.navigate('DeletePamily', { deleteTeamId })
              }}
              style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
            >
              <PopButtonText>예</PopButtonText>
            </PopButton>
            <PopButton
              onPress={() => {
                setVisible(false)
                swipeableRefs.current[deleteTeamId]?.close()
              }}
            >
              <PopButtonText>아니오</PopButtonText>
            </PopButton>
          </PopButtonContainer>
        </ModalPopUp>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            borderRadius: 24,
          }}
        >
          <ProfileImageModal profileUrl={profileUrl} setProfileUrl={setProfileUrl} accessToken={ACCESSTOKEN} />
        </BottomSheetModal>
      </ScreenLayout>
    </BottomSheetModalProvider>
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
  border-radius: 24px;
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
const EditBox = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${colors.grey_150};
  border-radius: 99px;
  justify-content: center;
  align-items: center;
`
const GroupContainer = styled.View`
  padding: 12px 0px;
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
  padding: 24px 20px;
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
  margin-top: 64px;
  margin-bottom: 16px;
`
const PopTitle = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 20px;
  line-height: 28px;
  color: ${colors.grey_700};
`
const PopSubTitle = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 16px;
  line-height: 22px;
  color: ${colors.grey_500};
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
`
const DateContent = styled.View`
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  border-radius: 8px;
  background-color: ${colors.grey_100};
`
const DateText = styled.Text`
  font-family: 'Spoqa-Bold';
  color: ${colors.secondary};
  font-size: 22px;
  line-height: 30px;
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
