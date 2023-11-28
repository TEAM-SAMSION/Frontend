import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ModalPopUp, ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import { colors } from '../../colors'

import ErrorIcon from '../../assets/Svgs/error.svg'
import { BodyBold_Text, BodySm_Text } from '../../components/Fonts'
import { getUserDeleteValidation } from '../../components/MyPage/Apis'
import MyPageNav from '../../navigators/MyPageNav'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Account({ navigation }) {
  const [isRejectVisible, setIsRejectVisible] = useState(false)
  const [platform, setPlatform] = useState('-')

  const deleteValidation = async () => {
    try {
      await getUserDeleteValidation().then(() => {
        navigation.navigate('DeleteAccount')
      })
    } catch (error) {
      setIsRejectVisible(true)
    }
  }
  const checkPlatform = async () => {
    let platform = await AsyncStorage.getItem('platform')
    setPlatform(platform)
  }
  useEffect(() => {
    checkPlatform()
  }, [])

  return (
    <ScreenLayout>
      <ContentContainer>
        <ContentText>연결된 계정</ContentText>
        <AccountText>{platform}</AccountText>
      </ContentContainer>
      <ContentContainer onPress={() => deleteValidation()}>
        <ContentText style={{ color: colors.primary_outline }}>계정 탈퇴</ContentText>
      </ContentContainer>
      <ModalPopUp visible={isRejectVisible} petIcon={false} height={258}>
        <PopUpContainer style={{ marginTop: 18, marginBottom: 33 }}>
          <ErrorBox>
            <ErrorIcon width={48} height={48} color={colors.grey_100} />
          </ErrorBox>
          <MessageBox>
            <TextBox>
              <BodyBold_Text>관리자 권한을 위임해야 탈퇴할 수 있습니다</BodyBold_Text>
            </TextBox>
            <BodySm_Text color={colors.grey_450}>다른 회원에게 위임 후 다시 시도해주세요</BodySm_Text>
          </MessageBox>
        </PopUpContainer>
        <PopButtonContainer>
          <PopButton
            onPress={() => {
              setIsRejectVisible(false)
            }}
            style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
          >
            <PopButtonText>취소</PopButtonText>
          </PopButton>
          <PopButton
            onPress={() => {
              setIsRejectVisible(false)
              navigation.navigate('MyPageNav', { screen: 'MyPage' })
            }}
          >
            <PopButtonText>확인</PopButtonText>
          </PopButton>
        </PopButtonContainer>
      </ModalPopUp>
    </ScreenLayout>
  )
}

const ContentContainer = styled.TouchableOpacity`
  padding: 16px;
  padding-left: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const ContentText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 16px;
  line-height: 22px;
  color: ${colors.grey_700};
`
const AccountText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
  color: ${colors.grey_450};
`
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
