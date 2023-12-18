import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScreenLayout } from '../../components/Shared'
import { styled } from 'styled-components/native'
import { TopHeader } from '../../components/MyPage/TopHeader'
import { FlatList, RefreshControl, TouchableWithoutFeedback } from 'react-native'
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
import { BodyBoldSm_Text, BodyBold_Text, BodySm_Text, Detail_Text, SubHead_Text } from '../../components/Fonts'
import { TabBarAtom } from '../../recoil/TabAtom'
import { useIsFocused } from '@react-navigation/native'
import ErrorIcon from '../../assets/Svgs/error.svg'
import AdministratorNav from '../../navigators/AdministratorNav'

export default function MyPage({ navigation }) {
  const isFocused = useIsFocused()
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const setIsTabVisible = useSetRecoilState(TabBarAtom)

  useEffect(() => {
    isFocused && setIsTabVisible(true)
  }, [isFocused])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/default_user.png',
  )

  const swipeableRefs = useRef(null)

  const fetchUserInfo = () => {
    getUserInfo(ACCESSTOKEN).then((result) => {
      setEmail(result.email)
      setName(result.nickname)
      setProfileUrl(result.profileImageUrl)
    })
  }

  useEffect(() => {
    fetchUserInfo()
  }, [isFocused])

  const [groupInfo, setGroupInfo] = useState([])

  const fetchTeamList = async () => {
    getTeamList(ACCESSTOKEN).then((result) => {
      setGroupInfo(result)
    })
  }

  useEffect(() => {
    fetchTeamList()
  }, [isFocused])

  const [visible, setVisible] = useState(false)
  const [isRejectVisible, setIsRejectVisible] = useState(false)
  const [deleteTeam, setDeleteTeam] = useState('')
  const [deleteTeamName, setDeleteTeamName] = useState('')
  const [deleteTeamPeriod, setDeleteTeamPeriod] = useState()

  const deleteValidation = async (teamId) => {
    // 팀 탈퇴 검증 api -> status에 따라 팝업 종류 다르게
    try {
      await getTeamDeleteValidation(teamId).then(() => {
        setVisible(true)
      })
    } catch (error) {
      setIsRejectVisible(true)
    }
  }

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    fetchTeamList()
    fetchUserInfo()
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  return (
    <BottomSheetModalProvider>
      <ScreenLayout>
        <TopHeader navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
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
                            handleDelete={() => {
                              setDeleteTeam(item)
                              setDeleteTeamName(item.teamName)
                              setDeleteTeamPeriod(item.registerPeriod + 1)
                              deleteValidation(item.teamId)
                            }}
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
              {/* <FooterContainer>
                <Detail_Text color={'#A09999'}>
                  포잇에 대해 더 알아볼까요?{'\n'}좀 더 똑똑하게 포잇을 사용하고 싶다면?
                </Detail_Text>
                <Guide>포잇가이드</Guide>
              </FooterContainer> */}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <ModalPopUp visible={visible} petIcon={false} height={204}>
          <PopContent>
            <PopTitleBox>
              <PopTitle>정말 </PopTitle>
              <PopTitle style={{ color: colors.primary_outline }}>{deleteTeamName}</PopTitle>
              <PopTitle>을 나가시겠습니까?</PopTitle>
            </PopTitleBox>
          </PopContent>
          <PopButtonContainer>
            <PopButton
              onPress={() => {
                setVisible(false)
                navigation.navigate('DeletePamily', { deleteTeam, name, swipeableRefs })
              }}
              style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
            >
              <PopButtonText>예</PopButtonText>
            </PopButton>
            <PopButton
              onPress={() => {
                setVisible(false)
                swipeableRefs.current.close()
              }}
            >
              <PopButtonText>아니오</PopButtonText>
            </PopButton>
          </PopButtonContainer>
        </ModalPopUp>
        <ModalPopUp visible={isRejectVisible} petIcon={false} height={258}>
          <PopUpContainer style={{ marginTop: 18, marginBottom: 33 }}>
            <ErrorBox>
              <ErrorIcon width={48} height={48} color={colors.grey_100} />
            </ErrorBox>
            <MessageBox>
              <TextBox>
                <View style={{ flexDirection: 'row' }}>
                  <BodyBold_Text>{name}님은 </BodyBold_Text>
                  <BodyBold_Text>관리자 권한 위임 후,</BodyBold_Text>
                </View>
                <BodyBold_Text>Pamily를 나갈 수 있습니다</BodyBold_Text>
              </TextBox>
              <BodySm_Text color={colors.grey_450}>다른 회원에게 위임 후 다시 시도해주세요</BodySm_Text>
            </MessageBox>
          </PopUpContainer>
          <PopButtonContainer>
            <PopButton
              onPress={() => {
                setIsRejectVisible(false)
                swipeableRefs.current.close()
              }}
              style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
            >
              <PopButtonText>취소</PopButtonText>
            </PopButton>
            <PopButton
              onPress={async () => {
                await setIsRejectVisible(false)
                await swipeableRefs.current.close()
                navigation.navigate('AdministratorNav', { screen: 'AdminHome', params: { item: deleteTeam } })
              }}
            >
              <PopButtonText>확인</PopButtonText>
            </PopButton>
          </PopButtonContainer>
        </ModalPopUp>
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
