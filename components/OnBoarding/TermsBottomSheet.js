import styled from 'styled-components/native'
import Checkbox from '../../assets/Svgs/Checkbox.svg'
import Checkbox_off from '../../assets/Svgs/Checkbox_off.svg'
import { colors } from '../../colors'
import { useState } from 'react'
import { Button_PinkBg } from '../Buttons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loggedInState } from '../../recoil/AuthAtom'
import { BodyBoldSm_Text, BodyBold_Text, Detail_Text } from '../Fonts'
import { registerNickname, registerRoute } from './Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { checkFCMToken } from '../../AppBase'

export const TermsBottomSheet = ({ nickname, selectedRoute, detailRoute, accessToken, refreshToken, provider }) => {
  const [termState, setTermState] = useState({ 0: false, 1: false, 2: false })
  const [isLoading, setIsLoading] = useState(false)
  const setLoggedIn = useSetRecoilState(loggedInState)
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
  console.log(provider)
  const handleSubmit = () => {
    setIsLoading(true)
    let paths = ['인스타', '지인추천', '반려동물 커뮤니티', '검색']
    let path = selectedRoute == 5 ? detailRoute : paths[selectedRoute - 1]
    registerNickname(nickname, accessToken).then((result) => {
      console.log('registerNick', result)
      if (result == 200) {
        console.log('회원가입완료하였으므로, AsyncStorage에 토큰 저장하고 Login')
        AsyncStorage.setItem('refreshToken', refreshToken)
        AsyncStorage.setItem('accessToken', accessToken).then(() => registerRoute(path))
        AsyncStorage.setItem('platform', provider)
        checkFCMToken(accessToken)
        setLoggedIn(true)
      } else {
        console.log('닉네임등록이 잘 안되었는뎁쇼')
        setIsLoading(false)
      }
    })
  }

  const TermItem = ({ mandatory, title, subtitle, id }) => {
    return (
      <TermItemBase onPress={() => handleTermPress(id)}>
        <CheckboxContainer>
          {termState[id] ? (
            <Checkbox color={colors.grey_600} width={24} height={24} />
          ) : (
            <Checkbox_off width={24} height={24} />
          )}
        </CheckboxContainer>
        <ColumnBase>
          <RowBase>
            <BodyBoldSm_Text color={id == 0 ? colors.red_350 : colors.grey_600}>
              [{mandatory ? '필수' : '선택'}]
            </BodyBoldSm_Text>
            <BodyBoldSm_Text color={colors.grey_600}>{title}</BodyBoldSm_Text>
          </RowBase>
          <Detail_Text color={colors.grey_400} style={{ marginTop: 4 }}>
            {subtitle}
          </Detail_Text>
        </ColumnBase>
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
        <Detail_Text
          color={colors.grey_400}
          style={{ marginTop: 8 }}
        >{`권한을 허용하지 않으면 일부서비스가 제한될 수 있습니다`}</Detail_Text>
      </BottomSheetHeader>
      <BottomContainer>
        <TermItemBase onPress={() => handleTermAllPress()}>
          <CheckboxContainer>
            {termState[0] && termState[1] && termState[2] ? (
              <Checkbox color={colors.red_350} width={24} height={24} />
            ) : (
              <Checkbox_off color={colors.grey_600} width={24} height={24} />
            )}
          </CheckboxContainer>
          <BodyBold_Text color={colors.red_350}>전체 동의</BodyBold_Text>
        </TermItemBase>
        <Divider />
        <TermContainer>
          <TermItem id={0} mandatory={true} title="기기 및 앱 기록" subtitle="서비스 개선 및 오류 확인" />
          <TermItem id={1} mandatory={false} title="알림" subtitle="푸시 알림 및 메시지 수신 안내" />
          <TermItem id={2} mandatory={false} title="사진" subtitle="회원 및 펫, Pamily 프로필 사진 업로드 / 완료" />
        </TermContainer>
        <Button_PinkBg isLoading={isLoading} isEnabled={termState[0]} text="확인" func={() => handleSubmit()} />
      </BottomContainer>
    </BottomSheetBase>
  )
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

  margin-bottom: 32px;
`
const TermItemBase = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  margin-bottom: 16px;
`
const TermContainer = styled.View`
  flex-direction: column;
  margin-bottom: 24px;
`
const ColumnBase = styled.View`
  flex-direction: column;
`
const RowBase = styled.View`
  flex-direction: row;
`
const CheckboxContainer = styled.View`
  height: 24px;
  width: 24px;
  margin-right: 8px;
`
