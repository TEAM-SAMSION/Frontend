import { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, loggedInState } from '../../recoil/AuthAtom'
import CheckOn from '../../assets/Svgs/Check-box.svg'
import CheckOff from '../../assets/Svgs/Check-box_off.svg'

import {
  BodyBoldSm_Text,
  BodyBold_Text,
  BodySm_Text,
  DetailSm_Text,
  Detail_Text,
  SubHead_Text,
} from '../../components/Fonts'
import { ScreenLayout } from '../../components/Shared'
import { deleteAccount, postReason } from '../../components/MyPage/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import { ScrollView } from 'react-native'

export default function DeleteAccount3({ route, navigation }) {
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const data = route.params
  const reason = data.reason
  const [isChecked, setIsChecked] = useState(false)
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState)

  const finishWithDraw = async () => {
    try {
      console.log('Naver Logout')
      await NaverLogin.logout()
    } catch (e) {
      console.log(e)
    }

    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken').then(setLoggedIn(false))
  }
  const logOut = async () => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: 'HomeNav' }],
      }),
    )
    finishWithDraw()
  }

  const withDraw = () => {
    postReason(ACCESSTOKEN, reason)
    deleteAccount(ACCESSTOKEN)
  }

  return (
    <ScreenLayout>
      <Container style={{ marginBottom: 80 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleBox>
            <SubHead_Text>탈퇴하기 전에</SubHead_Text>
            <SubHead_Text>아래 내용을 꼭 확인하세요!</SubHead_Text>
          </TitleBox>
          <CheckList>
            <ContentBox>
              <BodyBold_Text color={colors.red_350}>1.</BodyBold_Text>
              <BodySm_Text>
                앱을 탈퇴하시면 현재 가입되어 있는
                <BodyBoldSm_Text color={colors.primary}> 모든 </BodyBoldSm_Text>
                모임에서 자동 탈퇴 처리됩니다.
              </BodySm_Text>
            </ContentBox>
            <ContentBox>
              <BodyBold_Text color={colors.red_350}>2.</BodyBold_Text>
              <OneLine>
                <BodySm_Text>
                  앱을 탈퇴하시면 해당 계정과 관련된
                  <BodyBoldSm_Text color={colors.primary}> 모든 </BodyBoldSm_Text>
                  데이터가 영구 삭제됩니다.
                </BodySm_Text>
                <Detail_Text color={colors.grey_450}>
                  단, 모임 TODO별 담당자 표시, TODO 완료 표시와 같이{'\n'}다른 사용자가 참고해야 하는 데이터의 경우
                  그대로 유지됩니다.
                </Detail_Text>
                <Detail_Text color={colors.grey_450}>
                  - 개인 일정 데이터{'\n'}- 개인 월간/연간 TODO 달성 통계
                </Detail_Text>
              </OneLine>
            </ContentBox>
            <ContentBox>
              <BodyBold_Text color={colors.red_350}>3.</BodyBold_Text>
              <BodySm_Text>
                모임의 관리자(운영진)는 다른 사용자에게 권한을 위임하거나 일반 회원으로 권한 변경 후 앱을 탈퇴하실 수
                있습니다.
              </BodySm_Text>
            </ContentBox>
            <ContentBox>
              <BodyBold_Text color={colors.red_350}>4.</BodyBold_Text>
              <BodySm_Text>
                모임의 관리자(회장)은 모임을 삭제하거나, 다른 사용자에게 권한을 위임한 후 앱을 탈퇴하실 수 있습니다.
              </BodySm_Text>
            </ContentBox>
          </CheckList>
          <CheckContainer>
            <CheckButton onPress={() => setIsChecked(!isChecked)}>
              {isChecked ? (
                <CheckOn width={24} height={24} color={colors.grey_600} />
              ) : (
                <CheckOff width={24} height={24} color={colors.grey_600} />
              )}
            </CheckButton>
            <BodyBoldSm_Text color={colors.red_350}>[필수] </BodyBoldSm_Text>
            <BodyBoldSm_Text color={colors.grey_600}>해당 내용을 완벽히 숙지했습니다.</BodyBoldSm_Text>
          </CheckContainer>
        </ScrollView>
      </Container>
      <DeleteButton
        disabled={isChecked ? false : true}
        onPress={async () => {
          await withDraw()
          logOut()
        }}
        style={{ backgroundColor: isChecked ? colors.primary_container : colors.grey_150 }}
      >
        <ButtonText style={{ color: isChecked ? colors.primary : colors.grey_500 }}>포잇 탈퇴하기</ButtonText>
      </DeleteButton>
    </ScreenLayout>
  )
}

const Container = styled.View`
  margin: 16px;
`
const TitleBox = styled.View`
  margin-bottom: 16px;
`
const OneLine = styled.View`
  gap: 8px;
`
const ContentBox = styled.View`
  padding: 12px;
  gap: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
`
const CheckList = styled.View`
  gap: 8px;
`
const CheckContainer = styled.View`
  flex-direction: row;
  height: 48px;
  padding: 15px 12px;
  margin-top: 16px;
  background-color: ${colors.grey_150};
  align-items: center;
  border-radius: 8px;
`
const CheckButton = styled.TouchableOpacity`
  margin-right: 8px;
`
const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  left: 16px;
  right: 16px;
  background-color: ${colors.red_200};
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`
const ButtonText = styled.Text`
  color: ${colors.primary};
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
`
