import React, { useCallback, useRef, useState } from 'react'
import { Input, InputTitle, ScreenKeyboardLayout, ScreenWidth, url } from '../../components/Shared'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import BackArrow from '../../assets/Svgs/chevron_back.svg'
import { Button_PinkBg } from '../../components/Buttons'
import { Keyboard, NativeModules, Pressable } from 'react-native'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { routeList } from '../../datas/OnBoarding/data'
import { TermsBottomSheet } from '../../components/OnBoarding/TermsBottomSheet'
import { Detail_Text, SubHead_Text } from '../../components/Fonts'

export const UserSetting = ({ navigation, route }) => {
  const { StatusBarManager } = NativeModules
  const [statusBarHeight, setStatusBarHeight] = useState(0)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [detailRoute, setDetailRoute] = useState('')
  const [nickname, setNickname] = useState('')

  let { accessToken, refreshToken, provider } = route?.params
  // let { accessToken, refreshToken, provider } = ['asdf', 'fdas', 'Navaer'] //** */
  // console.log(accessToken, refreshToken, provider)
  Platform.OS == 'ios'
    ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      })
    : null

  const bottomModal = useRef()
  const handleSubmit = () => {
    Keyboard.dismiss()
    if (ScreenWidth < 380) {
      bottomModal.current?.snapToIndex(1)
    } else {
      bottomModal.current?.snapToIndex(0)
    }
  }
  const handleSelect = (id) => {
    if (id != 4) {
      setDetailRoute('')
    } else {
    }
    setSelectedRoute(id + 1)
    console.log(selectedRoute)
  }

  const isEnabled =
    selectedRoute == 5
      ? detailRoute.length > 0 && nickname.length > 0 && selectedRoute
      : nickname.length > 0 && selectedRoute
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  )
  return (
    <ScreenKeyboardLayout behavior="none" verticalOffset={statusBarHeight + 44}>
      <Pressable style={{ width: '100%', flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <BackButton onPress={() => navigation.goBack()}>
          <BackArrow width={24} height={24} />
        </BackButton>
        <ContentContainer>
          <TopContainer>
            <SubHead_Text color={colors.grey_800}>포잇과 함께 하게 되어 영광이에요!</SubHead_Text>
            <TextContainer>
              <SubHead_Text color={colors.primary}>사전 정보</SubHead_Text>
              <SubHead_Text color={colors.grey_800}>를 입력해 주세요!</SubHead_Text>
            </TextContainer>
            <InputContainer>
              <InputTitle>닉네임 설정</InputTitle>
              <Input
                style={{ backgroundColor: colors.grey_150, color: colors.grey_700 }}
                autoCapitalize="none"
                placeholderTextColor={colors.grey_450}
                onSubmitEditing={() => Keyboard.dismiss()}
                placeholder="닉네임을 입력해주세요"
                returnKeyType="done"
                inputMode="text"
                blurOnSubmit={false}
                maxLength={10}
                onChangeText={(text) => setNickname(text)}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>포잇을 알게된 경로</InputTitle>
              <RouteItemContainer>
                {routeList.map((item, id) => {
                  return (
                    <RouteItem
                      onPress={() => handleSelect(id)}
                      style={{ backgroundColor: selectedRoute == id + 1 ? colors.primary_container : colors.grey_150 }}
                      key={id}
                    >
                      <Detail_Text color={colors.grey_600}>{item}</Detail_Text>
                    </RouteItem>
                  )
                })}
              </RouteItemContainer>
            </InputContainer>
            {selectedRoute == 5 && (
              <InputContainer>
                <InputTitle>포잇을 알게된 경로를 자세히 입력해주세요</InputTitle>
                <Input
                  style={{ backgroundColor: colors.grey_150, color: colors.grey_700 }}
                  autoCapitalize="none"
                  placeholderTextColor={colors.grey_450}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  placeholder="경로를 입력해주세요"
                  returnKeyType="done"
                  inputMode="text"
                  blurOnSubmit={false}
                  onChangeText={(text) => setDetailRoute(text)}
                />
              </InputContainer>
            )}
          </TopContainer>
          <Button_PinkBg text="입력 완료" isEnabled={isEnabled} func={() => handleSubmit()} />
        </ContentContainer>
        <BottomSheet
          ref={bottomModal}
          backdropComponent={renderBackdrop}
          index={-1}
          snapPoints={['50%', '64%']}
          enablePanDownToClose={false}
          enableHandlePanningGesture={false}
          enableContentPanningGesture={false}
          handleHeight={0}
          enableDismissOnClose
          handleIndicatorStyle={{ backgroundColor: colors.grey_300, width: 72, height: 6 }}
        >
          <TermsBottomSheet
            refreshToken={refreshToken}
            accessToken={accessToken}
            nickname={nickname}
            selectedRoute={selectedRoute}
            provider={provider}
            detailRoute={detailRoute}
          />
        </BottomSheet>
      </Pressable>
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
const TopContainer = styled.View`
  width: 100%;
  flex-direction: column;
`
const RouteItem = styled.TouchableOpacity`
  display: inline-block;
  padding: 8px 16px;
  margin-bottom: 8px;
  margin-right: 8px;
  border-radius: 99px;
  justify-content: center;
  align-items: center;
`
const TextContainer = styled.View`
  flex-direction: row;
  margin-bottom: 32px;
`
