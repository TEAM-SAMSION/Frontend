import React, { useCallback, useRef, useState } from 'react'
import { Input, InputTitle, ScreenKeyboardLayout, url } from '../../components/Shared'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import BackArrow from '../../assets/Svgs/chevron_back.svg'
import { UserSettingButton } from '../../components/Buttons'
import { Keyboard, NativeModules } from 'react-native'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { routeList } from '../../datas/OnBoarding/data'
import { TermsBottomSheet } from '../../components/OnBoarding/TermsBottomSheet'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '../../recoil/AuthAtom'

export const UserSetting = ({ navigation }) => {
  const { StatusBarManager } = NativeModules
  const [statusBarHeight, setStatusBarHeight] = useState(0)
  Platform.OS == 'ios'
    ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      })
    : null

  const [nickname, setNickname] = useState('')
  const bottomModal = useRef()
  const { accessToken } = useRecoilValue(userInfoState)

  const registerNickname = async (nickname) => {
    console.log(nickname, accessToken)
    let API = `/user/name?nickname=${nickname}`

    const response = await axios.put(
      url + API,
      {},
      {
        headers: {
          Authorization: accessToken,
          'Content-Type': `application/json; charset=UTF-8`,
        },
      },
    )
    return response.data
  }
  const handleSubmit = () => {
    Keyboard.dismiss()
    popModal()
  }
  const popModal = () => {
    bottomModal.current?.snapToIndex(0)
  }

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  )
  return (
    <ScreenKeyboardLayout verticalOffset={statusBarHeight + 44}>
      <BackButton onPress={() => navigation.goBack()}>
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
              // autoFocus
              autoCapitalize="none"
              placeholderTextColor={colors.grey_450}
              onSubmitEditing={() => Keyboard.dismiss()}
              placeholder="닉네임을 입력해주세요"
              returnKeyType="done"
              inputMode="text"
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
        <UserSettingButton text="입력 완료" isEnabled={nickname.length > 0} func={() => handleSubmit()} />
      </ContentContainer>
      <BottomSheet
        ref={bottomModal}
        backdropComponent={renderBackdrop}
        index={-1}
        snapPoints={['55%']}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleHeight={0}
        enableDismissOnClose
        // backgroundComponent={() => <View />}
        // handleIndicatorStyle={{ height: 0 }}
        handleIndicatorStyle={{ backgroundColor: colors.grey_300, width: 72, height: 6 }}
      >
        <TermsBottomSheet registerNickname={registerNickname} nickname={nickname} />
      </BottomSheet>
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
