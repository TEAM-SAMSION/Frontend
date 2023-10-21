import { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList, Animated } from 'react-native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import PlusIcon from '../../assets/Svgs/miniPlus.svg'
import ChevronRight from '../../assets/Svgs/chevron_right.svg'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { ProfileImageModal } from '../../components/Home/ProfileImageModal'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import SlideItem from '../../components/Home/SlideItem'
import { profileSample } from '../../datas/Home/data'

export default function CreateTeam({ navigation }) {
  const [enabled, setEnabled] = useState(false)
  const [pamilyName, setPamilyName] = useState('')
  const [pamilyCode, setPamilyCode] = useState('')
  const [profileUrl, setProfileUrl] = useState('')

  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            navigation.navigate('Home')
          }}
          style={{ marginRight: 24 }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 22,
              color: enabled ? colors.primary : colors.grey_450,
            }}
          >
            완료
          </Text>
        </TouchableOpacity>
      ),
    })
  }, [enabled])

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['60%']
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
    [],
  )

  const renderItem = ({ item }) => (
    <SampleImageContainer>
      <SampleImage key={item.id} source={item.image} />
    </SampleImageContainer>
  )

  return (
    <BottomSheetModalProvider>
      <ScreenLayout color={colors.grey_150}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
          }}
        >
          <Container>
            <InputBlock
              editable
              onChangeText={(text) => setPamilyName(text)}
              placeholder="Pamily 이름 입력"
              placeholderTextColor={colors.grey_400}
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
              returnKeyType="done"
              // ref={(input) => {
              //   this.firstInput = input
              // }}
            />
            <Bar />
            <InputBlock
              editable
              onChangeText={(text) => setPamilyCode(text)}
              placeholder="Pamily 코드"
              placeholderTextColor={colors.grey_400}
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              returnKeyType="done"
              // ref={(input) => {
              //   this.secondInput = input
              // }}
            />
            <Block onPress={handlePresentModal}>
              <BlockText>Pamily 프로필 설정</BlockText>
              <ChevronRight width={16} height={16} color={colors.grey_800} />
            </Block>
            <Block onPress={() => navigation.navigate('AddPetProfile')}>
              <BlockText>펫 프로필</BlockText>
              <PlusIcon width={16} height={16} />
            </Block>
          </Container>
        </TouchableWithoutFeedback>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            borderRadius: 22,
          }}
        >
          <BottomTitle>
            <BottomTitleText>Pamily 프로필 등록</BottomTitleText>
          </BottomTitle>
          <ImageContainer>
            <ProfileImageBox />
            <ImageSampleContainer>
              {/* {profileSample.map((item) => (
                <SampleImageContainer>
                  <SampleImage key={item.id} source={item.image} />
                </SampleImageContainer>
              ))} */}
              <FlatList data={profileSample} numColumns={5} renderItem={renderItem} keyExtractor={(item) => item.id} />
            </ImageSampleContainer>
          </ImageContainer>
          <ButtonContainer>
            <CancelButton onPress={() => bottomSheetModalRef.current?.dismiss()}>
              <ButtonText>취소</ButtonText>
            </CancelButton>
            <OkButton>
              <ButtonText>확인</ButtonText>
            </OkButton>
          </ButtonContainer>
        </BottomSheetModal>
      </ScreenLayout>
    </BottomSheetModalProvider>
  )
}

const Container = styled.View`
  background-color: ${colors.grey_150};
  padding-top: 16px;
  height: 1000px;
  align-items: center;
`
const Bar = styled.View`
  width: 343px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.12);
`
const InputBlock = styled.TextInput`
  background-color: ${colors.grey_100};
  color: ${colors.grey_600};
  padding: 0px 16px;
  margin: 0px 16px;
  width: 343px;
  height: 44px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`
const Block = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 343px;
  height: 44px;
  padding: 0px 16px;
  border-radius: 8px;
  background-color: ${colors.grey_100};
  margin-top: 16px;
`
const BlockText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
`
const BottomTitle = styled.View`
  align-items: center;
  padding-top: 6px;
  padding-bottom: 16px;
`
const BottomTitleText = styled.Text`
  font-family: Spoqa Han Sans Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  color: ${colors.grey_800};
`
const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  //margin-top: 16px;
`
const ProfileImageBox = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  background-color: pink;
`
const ImageSampleContainer = styled.View`
  margin: 24px;
  flex-direction: row;
  gap: 8px;
`
const SampleImage = styled.Image`
  width: 59px;
  height: 59px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${colors.grey_200};
`
const SampleImageContainer = styled.TouchableOpacity`
  width: 59px;
  height: 59px;
  margin: 4px 4px;
`
const ButtonContainer = styled.View`
  flex-direction: row;
  margin: 0px 16px;
  gap: 8px;
`
const CancelButton = styled.TouchableOpacity`
  border: 2px solid;
  border-color: ${colors.grey_150};
  background-color: ${colors.grey_100};
  display: flex;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 8px;
`
const OkButton = styled.TouchableOpacity`
  background-color: ${colors.primary_container};
  display: flex;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 8px;
`
const ButtonText = styled.Text`
  color: ${colors.primary};
  font-family: Spoqa Han Sans Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`
