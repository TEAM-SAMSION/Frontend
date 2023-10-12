import styled from 'styled-components/native'
import Checkbox from '../../assets/Svgs/Checkbox.svg'
import Checkbox_off from '../../assets/Svgs/Checkbox_off.svg'
import { colors } from '../../colors'
import { useState } from 'react'
import { UserSettingButton } from '../Buttons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accessTokenState, loggedInState } from '../../recoil/AuthAtom'
import { BodyBold_Text } from '../Fonts'
import axios from 'axios'
import { url } from '../Shared'

export const TermsBottomSheet = ({ nickname }) => {
  const [termState, setTermState] = useState({ 0: false, 1: false, 2: false })
  const [isLoading, setIsLoading] = useState(false)
  const setLoggedIn = useSetRecoilState(loggedInState)
  const { accessToken } = useRecoilValue(userInfoState)

  const registerNickname = async (nickname) => {
    let API = `/user/name`
    const response = await axios.put(
      url + API,
      { nickname: nickname },
      {
        headers: {
          Authorization: accessToken,
          'Content-Type': `application/json; charset=UTF-8`,
        },
      },
    )
    return response.status
  }

  const handleTermPress = (id) => {
    let tempTermState = JSON.parse(JSON.stringify(termState))
    tempTermState[id] = !tempTermState[id]
    setTermState(tempTermState)
  }
  const handleTermAllPress = () => {
    if (termState[0] && termState[1] && termState[2]) {
      setTermState({ 0: false, 1: false, 2: false })
    } else {
      setTermState({ 0: true, 1: true, 2: true })
    }
  }
  const handleSubmit = () => {
    setIsLoading(true)
    registerNickname(nickname).then((result) => {
      if (result == 200) {
        console.log('닉네임등록 및 회원가입 완료')
        setLoggedIn(true)
      } else {
        console.log('닉네임등록이 잘 안되었는뎁쇼')
        setIsLoading(false)
      }
    })
  }

  const TermItem = ({ mandatory, title, subtitle, id }) => {
    return (
      <TermItemBase>
        <CheckboxContainer onPress={() => handleTermPress(id)}>
          {termState[id] ? <MyCheckBox /> : <Checkbox_off width={24} height={24} />}
        </CheckboxContainer>
        <TextContainer>
          <TermItemTitle>
            [{mandatory ? '필수' : '선택'}] {title}
          </TermItemTitle>
          <TermItemSubtitle>{subtitle}</TermItemSubtitle>
        </TextContainer>
      </TermItemBase>
    )
  }
  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 8,
      }}
    >
      <BottomSheetHeader>
        <BodyBold_Text color={colors.grey_800}>포잇 접근 권한 안내</BodyBold_Text>
        <TermSubTitle>{`권한을 허용하지 않아도 포잇 이용은 가능하지만
일부서비스 제한될 수 있습니다.`}</TermSubTitle>
      </BottomSheetHeader>
      <BottomContainer>
        <TermItemBase>
          <CheckboxContainer onPress={() => handleTermAllPress()}>
            {termState[0] && termState[1] && termState[2] ? <MyCheckBox /> : <Checkbox_off width={24} height={24} />}
          </CheckboxContainer>
          <TermItemTitle style={{ alignSelf: 'center', fontSize: 16 }}>전체 동의</TermItemTitle>
        </TermItemBase>
        <Divider />
        <TermContainer>
          <TermItem id={0} mandatory={true} title="기기 및 앱 기록" subtitle="서비스 개선 및 오류 확인" />
          <TermItem id={1} mandatory={false} title="알림" subtitle="푸시 알림 및 메시지 수신 안내" />
          <TermItem id={2} mandatory={false} title="사진" subtitle="유저 및 펫 프로필 사진, Pamily 대표 사진 업로드" />
        </TermContainer>
        <UserSettingButton isLoading={isLoading} isEnabled={termState[0]} text="확인" func={() => handleSubmit()} />
      </BottomContainer>
    </BottomSheetBase>
  )
}

const MyCheckBox = () => {
  return <Checkbox color={colors.grey_600} width={24} height={24} />
}

const Divider = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.12);
  margin-bottom: 16px;
`
const BottomContainer = styled.View`
  width: 100%;
`
const TermSubTitle = styled.Text`
  font-family: Spoqa-Medium;
  margin-top: 8px;
  color: ${colors.grey_400};
  font-size: 12px;
  line-height: 15px;
`
const BottomSheetBase = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px;
  border-radius: 24px 24px 0px 0px;
  flex-direction: column;
`
const BottomSheetHeader = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  height: 56px;
  margin-bottom: 32px;
`
const TermItemBase = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 16px;
`
const TermContainer = styled.View`
  flex-direction: column;
  margin-bottom: 24px;
`
const TermItemTitle = styled.Text`
  font-family: Spoqa-Bold;
  color: ${colors.grey_600};
  font-size: 14px;
`
const TermItemSubtitle = styled.Text`
  font-family: Spoqa-Medium;
  margin-top: 4px;
  color: ${colors.grey_400};
  font-size: 12px;
`
const TextContainer = styled.View`
  flex-direction: column;
`
const CheckboxContainer = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  margin-right: 8px;
`
