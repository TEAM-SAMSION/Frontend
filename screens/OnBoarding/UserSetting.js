import React, { useState } from 'react'
import { Input, InputTitle, ScreenKeyboardLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import BackArrow from '../../assets/Svgs/chevron_back.svg'
import { UserSettingButton } from '../../components/OnBoarding/Button'
import { Keyboard, View, NativeModules } from 'react-native'

export const UserSetting = () => {
  const { StatusBarManager } = NativeModules
  const [statusBarHeight, setStatusBarHeight] = useState(0)
  Platform.OS == 'ios'
    ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      })
    : null

  const [nickname, setNickname] = useState('')
  const routeList = ['인스타', '지인추천', '반려동물 커뮤니티', '검색', '기타']
  const handleSubmit = () => {}
  return (
    <ScreenKeyboardLayout verticalOffset={statusBarHeight + 44}>
      <View style={{ flex: 1 }}>
        <BackButton>
          <BackArrow width={24} height={24} />
        </BackButton>
        <ContentContainer>
          <TopContainer>
            <TitleText>{`포잇과 함께 하게되어 영광이에요!
사전 정보 입력을 완료해주세요!`}</TitleText>
            <InputContainer>
              <InputTitle>닉네임 설정</InputTitle>
              <Input
                style={{ backgroundColor: colors.grey_150, color: colors.grey_700 }}
                autoFocus
                autoCapitalize="none"
                placeholderTextColor={colors.grey_450}
                onSubmitEditing={() => Keyboard.dismiss()}
                placeholder="닉네임을 입력해주세요"
                returnKeyType="done"
                inputMode="text"
                contextMenuHidden={true}
                autoComplete="off"
                autoCorrect={false}
                blurOnSubmit={false}
                onChangeText={(text) => setNickname(text)}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>포잇을 알게된 경로</InputTitle>
              <RouteItemContainer>
                {routeList.map((item, id) => {
                  return (
                    <RouteItem key={id}>
                      <RouteItemText>{item}</RouteItemText>
                    </RouteItem>
                  )
                })}
              </RouteItemContainer>
            </InputContainer>
          </TopContainer>
          <UserSettingButton isEnabled={nickname.length > 0} func={() => handleSubmit()} />
        </ContentContainer>
      </View>
    </ScreenKeyboardLayout>
  )
}

const ContentContainer = styled.View`
  margin: 0px 16px;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`
const BackButton = styled.TouchableOpacity`
  width: 52px;
  height: 52px;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`
const InputContainer = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: 24px;
`
const RouteItemContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`
const TitleText = styled.Text`
  font-size: 20px;
  line-height: 28px;
  color: ${colors.grey_600};
  font-family: Spoqa-Bold;
  margin-bottom: 32px;
`
const TopContainer = styled.View`
  width: 100%;
  flex-direction: column;
`
const RouteItem = styled.TouchableOpacity`
  display: inline-block;
  padding: 4px 8px;
  margin-bottom: 8px;
  margin-right: 12px;
  border-radius: 99px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey_300};
`
const RouteItemText = styled.Text`
  text-align: center;
  padding: 6px;
`
