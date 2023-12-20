import { useCallback, useEffect, useRef, useState } from 'react'
import { Keyboard, Pressable, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodyBold_Text, BodySm_Text, Body_Text, Detail_Text } from '../../components/Fonts'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableWithoutFeedback,
} from '@gorhom/bottom-sheet'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { ScreenHeight, ScreenLayout, ScreenWidth } from '../../components/Shared'
import EditIcon from '../../assets/Svgs/Edit.svg'
import RNFS from 'react-native-fs'
import { changeNickname, changeProfileImage, getUserInfo } from '../../components/MyPage/Apis'
import { ProfileImageModal } from '../../components/MyPage/ProfileImageModal'
import { useIsFocused } from '@react-navigation/native'
import { TabBarAtom } from '../../recoil/TabAtom'
import BackButton from '../../assets/Svgs/chevron_back.svg'
import About2 from '../../assets/Svgs/about2.svg'
import CloseIcon from '../../assets/Svgs/Close.svg'

export default function TuMyPage2({ navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)

  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  const [enabled, setEnabled] = useState(false)
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/default_user.png',
  )
  const [name, setName] = useState('펫모리')
  const [email, setEmail] = useState('이메일')

  // onFocus
  const [onName, setOnName] = useState(false)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  return (
    <ScreenLayout>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          navigation.navigate('TuMyPage3')
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
              top: 170,
              right: ScreenWidth / 2 - 55 - 8,
              borderWidth: 4,
              borderRadius: 99,
              borderColor: colors.primary_outline,
            }}
          >
            <View
              style={{
                backgroundColor: colors.grey_200,
                width: 28,
                height: 28,
                borderRadius: 26,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <EditIcon width={16} height={16} color={'#4D4D4D'} />
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 110,
              width: ScreenWidth,
              alignItems: 'center',
            }}
          >
            <View style={{ marginBottom: 4 }}>
              <Body_Text color={colors.red_200} style={{ textAlign: 'center' }}>
                아이콘을 클릭하여
              </Body_Text>
              <Body_Text color={colors.red_200}>프로필 사진을 변경할 수 있어요</Body_Text>
            </View>
            <About2 widwth={20} hieght={20} />
          </View>
          <View style={{ position: 'absolute', bottom: 180, width: ScreenWidth, alignItems: 'center' }}>
            <Body_Text color={colors.red_200}>닉네임 박스를 클릭하여 닉네임을 변경할 수 있어요!</Body_Text>
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
          <BodyBold_Text color={colors.grey_600}>회원 정보 수정</BodyBold_Text>
          <BodyBold_Text color={colors.primary_outline}>완료</BodyBold_Text>
        </TopNav>
        <ProfileContainer>
          <View>
            <ProfileImage
              source={{
                uri: `${profileUrl}`,
              }}
            />
            <IconCover>
              <EditIcon width={16} height={16} color={'#4D4D4D'} />
            </IconCover>
          </View>
        </ProfileContainer>
        <InfoContainer>
          <InputBox
            style={{
              padding: 12,
            }}
          >
            <Detail_Text color={colors.grey_800}>닉네임</Detail_Text>
            <Detail_Text color={colors.grey_800}>{name}</Detail_Text>
          </InputBox>
          {name.length > 10 && (
            <TextAlertBox>
              <Detail_Text color={colors.primary_outline}>10자 이내로 입력해주세요</Detail_Text>
            </TextAlertBox>
          )}
          <InputBox style={{ padding: 12 }}>
            <Detail_Text color={colors.grey_800}>이메일</Detail_Text>
            <Detail_Text color={colors.grey_400}>{email}</Detail_Text>
          </InputBox>
        </InfoContainer>
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

const Layout = styled.View`
  flex: 1;
  background-color: ${colors.grey_100};
`
const ProfileContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 32px 0px;
`
const ProfileImage = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 16px;
`
const IconCover = styled.View`
  position: absolute;
  bottom: -8;
  right: -8;
  background-color: ${colors.grey_200};
  width: 32px;
  height: 32px;
  border: 2px solid ${colors.grey_100};
  border-radius: 26px;
  justify-content: center;
  align-items: center;
`
const InputBox = styled.View`
  flex-direction: row;
  background-color: ${colors.grey_150};
  padding-left: 12px;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
`
const InputBlock = styled.TextInput`
  width: 80%;
  padding: 12px;
  font-family: 'Spoqa-Medium';
  color: ${colors.grey_600};
  font-size: 12px;
  line-height: 15px;
  text-align: right;
`
const InfoContainer = styled.View`
  gap: 8px;
  margin: 0px 16px;
`
const BottomTitle = styled.View`
  align-items: center;
  padding-top: 6px;
  padding-bottom: 10px;
`
const BottomTitleText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 16px;
  line-height: 22px;
  color: ${colors.grey_800};
`
const TextAlertBox = styled.View`
  align-items: flex-end;
  margin-right: 5px;
`
const TopNav = styled.View`
  flex-direction: row;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  margin: 0 16px;
`
