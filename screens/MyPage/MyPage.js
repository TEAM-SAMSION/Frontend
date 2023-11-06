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
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { ModalPopUp } from '../../components/Shared'
import { colors } from '../../colors'
import { getTeamList, getUserInfo } from '../../components/MyPage/Apis'

export default function MyPage({ navigation }) {
  const [name, setName] = useState('포잇')
  const [email, setEmail] = useState('pawith@gmail.com')
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/profileDefault.png',
  )

  const swipeableRefs = useRef([])
  const ACCESSTOKEN = useRecoilValue(accessTokenState)

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
  }, [])

  const [visible, setVisible] = useState(false)
  const [deleteTeamId, setDeleteTeamId] = useState('')

  const deleteTeam = async (teamId) => {
    const url = `https://dev.pawith.com/register/${teamId}`
    try {
      const response = await axios.delete(url, {
        params: { todoTeamId: teamId },
        headers: {
          Authorization: `${ACCESSTOKEN}`,
        },
      })
      console.log(`${teamId} 삭제`)
    } catch (error) {
      console.error(error.message)
    }
  }

  const deleteItem = async () => {
    console.log(deleteTeamId)
    await deleteTeam(deleteTeamId)
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
            <TouchableOpacity onPress={handlePresentModal}>
              <ProfileImage
                source={{
                  uri: `${profileUrl}`,
                }}
              />
            </TouchableOpacity>
            <UserDetailContainer>
              <UserNameBox>
                <Username>{name}</Username>
                <EditIcon width={24} height={24} />
              </UserNameBox>
              <EmailBox>
                <EmailText>{email}</EmailText>
              </EmailBox>
            </UserDetailContainer>
          </UserContainer>
          <GroupContainer>
            <Title>내가 속한 Pamily</Title>
            <Groups>
              <FlatList
                data={groupInfo}
                renderItem={({ item }) => {
                  return (
                    <GroupBox
                      data={item}
                      handleDelete={() => {
                        setDeleteTeamId(item.teamId)
                        setVisible(true)
                      }}
                      swipeableRef={(ref) => (swipeableRefs.current[item.teamId] = ref)}
                    />
                  )
                }}
              />
            </Groups>
          </GroupContainer>
          <FooterContainer>
            <FooterText>포잇에 대해 더 알아볼까요?{'\n'}좀 더 똑똑하게 포잇을 사용하고 싶다면?</FooterText>
            <Guide>포잇가이드</Guide>
          </FooterContainer>
        </ScrollView>
        {/* 팝업 */}
        <ModalPopUp visible={visible} petIcon={false} height={290}>
          <PopContent>
            <PopSubTitle>정말 Pamily를 나가시겠습니까?</PopSubTitle>
            <PopTitleBox>
              <PopTitle style={{ color: colors.primary_outline }}>패밀리</PopTitle>
              <PopTitle>와 함께한 {name} 님의 시간</PopTitle>
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
                navigation.navigate('DeletePamily')
              }}
              style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
            >
              <PopButtonText>예</PopButtonText>
            </PopButton>
            <PopButton onPress={() => setVisible(false)}>
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
            borderRadius: 22,
          }}
        >
          <ProfileImageModal profileUrl={profileUrl} setProfileUrl={setProfileUrl} accessToken={ACCESSTOKEN} />
        </BottomSheetModal>
      </ScreenLayout>
    </BottomSheetModalProvider>
  )
}

const UserContainer = styled.View`
  padding: 12px 20px;
  flex-direction: row;
  gap: 16px;
`
const ProfileImage = styled.Image`
  width: 78px;
  height: 78px;
  border-radius: 24px;
`
const UserDetailContainer = styled.View`
  justify-content: center;
`
const UserNameBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
const Username = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 20px;
  line-height: 28px;
`
const EmailBox = styled.View``
const EmailText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
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
  background-color: #f2f2f2;
  padding-top: 24px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 500px;
`
const FooterText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 12px;
  line-height: 15px;
`
const Guide = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
  text-decoration-line: underline;
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
