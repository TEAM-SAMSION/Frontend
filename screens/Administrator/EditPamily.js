import { useCallback, useEffect, useRef, useState } from 'react'
import { Keyboard, TouchableOpacity, View } from 'react-native'
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
import { useIsFocused } from '@react-navigation/native'
import { TabBarAtom } from '../../recoil/TabAtom'
import { ProfileImageModal } from '../../components/Home/ProfileImageModal'
import Clipboard from '@react-native-clipboard/clipboard'
import { postTeamInfo } from '../../components/Administrator/Apis'

export default function EditPamily({ route, navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)

  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  // onFocus
  const [onName, setOnName] = useState(false)
  const [onIntro, setOnIntro] = useState(false)

  const data = route.params
  const teamId = data.teamId
  const code = data.teamCode
  const [enabled, setEnabled] = useState(false)
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/default_user.png',
  )
  const [name, setName] = useState('')
  const [intro, setIntro] = useState('')
  const [pamilyFile, setPamilyFile] = useState('file://' + RNFS.MainBundlePath + '/default_pet.png')

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  useEffect(() => {
    setIntro(data.intro)
    setName(data.name)
    setProfileUrl(data.profileUrl)
  }, [isFocused])

  useEffect(() => {
    if (name === '' || intro === '' || name.length > 20 || intro.length > 20) {
      setEnabled(false)
      console.log(enabled)
    } else {
      setEnabled(true)
    }
  }, [name, intro, profileUrl, pamilyFile])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            EditTeamInfo()
            navigation.navigate('AdminHome', {
              item: {
                teamId: teamId,
                teamProfileImageUrl: profileUrl,
                teamName: name,
                authority: data.myAuthority,
                registerPeriod: data.period,
              },
            })
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
  }, [enabled, name, intro, profileUrl, pamilyFile])

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['60%']
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetModalRef.current?.present()
  }, [])
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
    [],
  )

  const EditTeamInfo = async () => {
    const TeamData = new FormData()
    if (data.profileUrl !== profileUrl) {
      TeamData.append('teamImageFile', {
        uri: pamilyFile,
        name: 'teamImageFile.png',
        type: 'image/png',
      })
    } else {
      TeamData.append('teamImageFile', {})
    }
    const teamInfo = {
      teamName: name,
      description: intro,
    }
    const json = JSON.stringify(teamInfo)
    TeamData.append('todoTeamUpdateInfo', { string: json, type: 'application/json' })
    console.log(TeamData)
    console.log(TeamData._parts)
    postTeamInfo(ACCESSTOKEN, teamId, TeamData)
  }

  const copyText = `초대코드: ${code}${'\n'}참여방법: 포잇 > Pamily 참여하기 > 코드 입력`
  const copyTeamCode = () => {
    Clipboard.setString(copyText)
  }

  return (
    <>
      <BottomSheetModalProvider>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Layout>
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
              <InputBox style={{ paddingRight: 12 }}>
                <Detail_Text color={colors.grey_800}>Pamily 코드</Detail_Text>
                <CodeBox>
                  <Detail_Text style={{ color: colors.grey_400 }}>{code}</Detail_Text>
                  <CodeButton onPress={copyTeamCode}>
                    <Detail_Text color={colors.secondary}>복사</Detail_Text>
                  </CodeButton>
                </CodeBox>
              </InputBox>
              <InputBox
                style={{
                  borderWidth: onName ? 1 : 0,
                  borderColor: onName ? (name.length > 20 ? colors.primary_outline : 'rgba(0, 0, 0, 0.12)') : '',
                }}
              >
                <Detail_Text color={colors.grey_800}>Pamily 이름</Detail_Text>
                <InputBlock
                  editable
                  onChangeText={(text) => setName(text)}
                  value={name}
                  returnKeyType="done"
                  onFocus={() => setOnName(true)}
                  onBlur={() => setOnName(false)}
                  maxLength={23}
                />
              </InputBox>
              {name.length > 20 && (
                <TextAlertBox>
                  <Detail_Text color={colors.primary_outline}>20자 이내로 입력해주세요</Detail_Text>
                </TextAlertBox>
              )}
              <InputBox
                style={{
                  borderWidth: onIntro ? 1 : 0,
                  borderColor: onIntro ? (intro.length > 20 ? colors.primary_outline : 'rgba(0, 0, 0, 0.12)') : '',
                }}
              >
                <Detail_Text color={colors.grey_800}>한줄소개</Detail_Text>
                <InputBlock
                  editable
                  onChangeText={(text) => setIntro(text)}
                  value={intro}
                  returnKeyType="done"
                  onFocus={() => setOnIntro(true)}
                  onBlur={() => setOnIntro(false)}
                  maxLength={25}
                />
              </InputBox>
              {intro.length > 20 && (
                <TextAlertBox>
                  <Detail_Text color={colors.primary_outline}>20자 이내로 입력해주세요</Detail_Text>
                </TextAlertBox>
              )}
            </InfoContainer>
          </Layout>
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
          <ProfileImageModal
            profileUrl={profileUrl}
            setProfileUrl={setProfileUrl}
            bottomRef={bottomSheetModalRef}
            setImageFile={setPamilyFile}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
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
const CodeButton = styled.TouchableOpacity`
  background-color: ${colors.grey_100};
  padding: 6px 8px;
  border-radius: 4px;
`
const CodeBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const TextAlertBox = styled.View`
  align-items: flex-end;
  margin-right: 5px;
`
