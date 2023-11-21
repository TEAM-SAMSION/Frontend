import { useCallback, useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodySm_Text, Body_Text, Detail_Text } from '../../components/Fonts'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableWithoutFeedback,
} from '@gorhom/bottom-sheet'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { ScreenLayout, ScreenWidth } from '../../components/Shared'
import EditIcon from '../../assets/Svgs/Edit.svg'
import RNFS from 'react-native-fs'
import { changeNickname, changeProfileImage, getUserInfo } from '../../components/MyPage/Apis'
import { ProfileImageModal } from '../../components/MyPage/ProfileImageModal'
import { useIsFocused } from '@react-navigation/native'
import { TabBarAtom } from '../../recoil/TabAtom'

export default function EditUserInfo({ route, navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)

  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  const data = route.params
  const [enabled, setEnabled] = useState(false)
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/default_user.png',
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profileFile, setProfileFile] = useState('file://' + RNFS.MainBundlePath + '/default_pet.png')

  // onFocus
  const [onName, setOnName] = useState(false)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  useEffect(() => {
    setEmail(data.email)
    setName(data.name)
    setProfileUrl(data.profileUrl)
  }, [isFocused])

  useEffect(() => {
    const isEmpty = name === ''
    setEnabled(!isEmpty)

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            EditUserInfo()
            navigation.navigate('MyPage')
          }}
          style={{ marginRight: 16 }}
        >
          <Body_Text
            style={{
              color: enabled ? colors.primary : colors.grey_450,
            }}
          >
            완료
          </Body_Text>
        </TouchableOpacity>
      ),
    })
  }, [name, profileUrl, profileFile])

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['40%']
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
    [],
  )

  const EditUserInfo = async () => {
    if (data.profileUrl !== profileUrl) {
      const defaultData = new FormData()
      defaultData.append('profileImage', {
        uri: profileFile,
        name: 'default_user.png',
        type: 'image/png',
      })
      changeProfileImage(ACCESSTOKEN, defaultData)
    }
    if (data.name !== name) {
      changeNickname(ACCESSTOKEN, name)
    }
  }

  return (
    <>
      <BottomSheetModalProvider>
        <ScreenLayout>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss()
            }}
          >
            <>
              <ProfileContainer>
                <TouchableOpacity onPress={handlePresentModal}>
                  <ProfileImage
                    source={{
                      uri: `${profileUrl}`,
                    }}
                  />
                  <IconCover>
                    <EditIcon width={16} height={16} color={'#4D4D4D'} />
                  </IconCover>
                </TouchableOpacity>
              </ProfileContainer>
              <InfoContainer>
                <InputBox style={{ borderWidth: onName ? 1 : 0, borderColor: onName ? 'rgba(0, 0, 0, 0.12)' : '' }}>
                  <Detail_Text color={colors.grey_800}>닉네임</Detail_Text>
                  <InputBlock
                    editable
                    onChangeText={(text) => setName(text)}
                    value={name}
                    returnKeyType="done"
                    onFocus={() => setOnName(true)}
                    onBlur={() => setOnName(false)}
                  />
                </InputBox>
                <InputBox>
                  <Detail_Text color={colors.grey_800}>이메일</Detail_Text>

                  <Detail_Text color={colors.grey_400}>{email}</Detail_Text>
                </InputBox>
              </InfoContainer>
            </>
          </TouchableWithoutFeedback>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={{
              borderRadius: 24,
            }}
          >
            <BottomTitle>
              <BottomTitleText>회원 프로필 사진 설정</BottomTitleText>
            </BottomTitle>
            <ProfileImageModal
              profileUrl={profileUrl}
              setProfileUrl={setProfileUrl}
              setProfileFile={setProfileFile}
              accessToken={ACCESSTOKEN}
            />
          </BottomSheetModal>
        </ScreenLayout>
      </BottomSheetModalProvider>
    </>
  )
}

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
  padding: 12px;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
`
const InputBlock = styled.TextInput`
  font-family: 'Spoqa-Medium';
  background-color: ${colors.grey_150};
  color: ${colors.grey_600};
  font-size: 12px;
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
