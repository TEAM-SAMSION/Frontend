import { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList, Animated } from 'react-native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import PlusIcon from '../../assets/Svgs/miniPlus.svg'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { ProfileImageModal } from '../../components/Home/ProfileImageModal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import SlideItem from '../../components/Home/SlideItem'
import { profileSample } from '../../datas/Home/data'
import { BodySm_Text, Detail_Text } from '../../components/Fonts'
import { getTeamCode } from '../../components/Home/Apis'
import { TabBarAtom } from '../../recoil/TabAtom'
import { useIsFocused } from '@react-navigation/native'
import EditIcon from '../../assets/Svgs/Edit.svg'
import Clipboard from '@react-native-clipboard/clipboard'
import { AddPetBox } from '../../components/Home/AddPetBox'

export default function CreateTeam({ route, navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)

  const [enabled, setEnabled] = useState(false)
  const [pamilyName, setPamilyName] = useState('')
  const [pamilyCode, setPamilyCode] = useState('')
  const [pamilyIntro, setPamilyIntro] = useState('')
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/profileDefault.png',
  )
  const [petArray, setPetArray] = useState([])
  const [savedPets, setSavedPets] = useState([])

  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  useEffect(() => {
    try {
      const { result } = route.params || { result: [] } // route.params가 undefined일 경우 빈 배열로 설정
      console.log(result) // 확인용 로그
      const resultArray = Array.isArray(result) ? result : [result]
      setPetArray(resultArray)
      setSavedPets((prevArray) => [...prevArray, ...resultArray])
    } catch (error) {
      console.error('Error in useEffect:', error)
    }
  }, [route.params])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            navigation.navigate('Home')
          }}
          style={{ marginRight: 16 }}
        >
          <Text
            style={{
              fontFamily: 'Spoqa-Medium',
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

  const savePetArray = () => {
    setSavedPets((prevArray) => [...prevArray, petArray.result])
    // if (!petArrayAccumulated.some((item) => JSON.stringify(item) === JSON.stringify(petArray))) {
    //   petArrayAccumulated.push(petArray)
    // }
  }

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

  const createTeamCode = () => {
    getTeamCode(ACCESSTOKEN).then((result) => {
      setPamilyCode(result)
    })
  }

  const copyTeamCode = () => {
    Clipboard.setString(pamilyCode)
  }

  return (
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
            <Container>
              <InputBox>
                <Detail_Text color={colors.grey_800}>Pamily 코드</Detail_Text>
                {pamilyCode == '' ? (
                  <CodeButton onPress={createTeamCode}>
                    <Detail_Text color={colors.secondary}>발급 받기</Detail_Text>
                  </CodeButton>
                ) : (
                  <CodeBox>
                    <Detail_Text style={{ color: colors.grey_400 }}>{pamilyCode}</Detail_Text>

                    <CodeButton onPress={copyTeamCode}>
                      <Detail_Text color={colors.secondary}>복사</Detail_Text>
                    </CodeButton>
                  </CodeBox>
                )}
              </InputBox>
              <InputBox>
                <Detail_Text color={colors.grey_800}> Pamily 이름</Detail_Text>
                <InputBlock
                  editable
                  onChangeText={(text) => setPamilyName(text)}
                  placeholder="이름을 입력해주세요."
                  placeholderTextColor={colors.grey_400}
                  returnKeyType="done"
                />
              </InputBox>
              <InputBox>
                <Detail_Text color={colors.grey_800}>한줄소개</Detail_Text>
                <InputBlock
                  editable
                  onChangeText={(text) => setPamilyIntro(text)}
                  placeholder="한줄소개를 입력해주세요. (20자이내)"
                  placeholderTextColor={colors.grey_400}
                  keyboardType="number"
                  returnKeyType="done"
                />
              </InputBox>
              <Block onPress={() => navigation.navigate('AddPetProfile')}>
                <Detail_Text>펫 프로필</Detail_Text>
                <PlusIcon width={16} height={16} />
              </Block>
              {savedPets.length < 0 ? '' : savedPets.map((pet, index) => <AddPetBox key={index} pet={pet} />)}
            </Container>
          </>
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
              <BodySm_Text color={colors.red_350}>취소</BodySm_Text>
            </CancelButton>
            <OkButton>
              <BodySm_Text color={colors.red_350}>확인</BodySm_Text>
            </OkButton>
          </ButtonContainer>
        </BottomSheetModal>
      </ScreenLayout>
    </BottomSheetModalProvider>
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
const Container = styled.View`
  gap: 8px;
  margin: 0px 16px;
`
const Bar = styled.View`
  width: 343px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.12);
`
const BlockView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 343px;
  height: 44px;
  padding: 0px 16px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
  margin-top: 16px;
`
const Block = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
`
const BottomTitle = styled.View`
  align-items: center;
  padding-top: 6px;
  padding-bottom: 16px;
`
const BottomTitleText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 16px;
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
  background-color: ${colors.red_200};
  display: flex;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 8px;
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
const InputBox = styled.View`
  flex-direction: row;
  background-color: ${colors.grey_150};
  padding: 0px 12px;
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
