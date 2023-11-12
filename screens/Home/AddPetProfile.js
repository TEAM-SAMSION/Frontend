import { useCallback, useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodySm_Text, Body_Text, Detail_Text } from '../../components/Fonts'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableWithoutFeedback,
} from '@gorhom/bottom-sheet'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { ProfileImageModal } from '../../components/Home/ProfileImageModal'
import { ScreenLayout, ScreenWidth } from '../../components/Shared'
import EditIcon from '../../assets/Svgs/Edit.svg'

export default function AddPetProfile({ route, navigation }) {
  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  const [enabled, setEnabled] = useState(false)
  const [petImageUrl, setPetImageUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/profileDefault.png',
  )
  const [petName, setPetName] = useState('')
  const [petAge, setPetAge] = useState()
  const [petCategory, setPetCategroy] = useState('')
  const [petDetail, setPetDetail] = useState('')
  const [petIntro, setPetIntro] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            const result = completeAddingPet(petName, petAge, petIntro, petCategory, petDetail)
            navigation.navigate('CreateTeam', { result })
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
  }, [enabled])

  useEffect(() => {
    const isEmpty = petName === '' || petAge === '' || petCategory === '' || petDetail === '' || petIntro === ''
    setEnabled(!isEmpty)
  }, [petName, petAge, petCategory, petDetail, petIntro])

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['40%']
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
    [],
  )

  const completeAddingPet = (name, age, intro, category, detail) => {
    const newPetArray = {
      name: name,
      age: age,
      description: intro,
      genus: category,
      species: detail,
    }
    return newPetArray
  }

  return (
    <>
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
                      uri: `${petImageUrl}`,
                    }}
                  />
                  <IconCover>
                    <EditIcon width={16} height={16} color={'#4D4D4D'} />
                  </IconCover>
                </TouchableOpacity>
              </ProfileContainer>
              <InfoContainer>
                <InputBox>
                  <Detail_Text color={colors.grey_800}>이름</Detail_Text>
                  <InputBlock
                    editable
                    onChangeText={(text) => setPetName(text)}
                    placeholder="이름을 입력해주세요."
                    placeholderTextColor={colors.grey_400}
                    returnKeyType="done"
                  />
                </InputBox>
                <InputBox>
                  <Detail_Text color={colors.grey_800}>나이</Detail_Text>
                  <InputBlock
                    editable
                    onChangeText={(text) => setPetAge(text)}
                    placeholder="나이를 입력해주세요."
                    placeholderTextColor={colors.grey_400}
                    keyboardType="number"
                    returnKeyType="done"
                  />
                </InputBox>
                <CategoryBlock>
                  <InputBox
                    style={{
                      width: (ScreenWidth - 40) / 2,
                    }}
                  >
                    <Detail_Text color={colors.grey_800}>종류</Detail_Text>
                    <InputBlock
                      editable
                      onChangeText={(text) => setPetCategroy(text)}
                      placeholder="ex_강아지"
                      placeholderTextColor={colors.grey_400}
                      style={{
                        flexGrow: 1,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      returnKeyType="done"
                    />
                  </InputBox>
                  <InputBox
                    style={{
                      width: (ScreenWidth - 40) / 2,
                    }}
                  >
                    <Detail_Text color={colors.grey_800}>펫 종</Detail_Text>
                    <InputBlock
                      editable
                      onChangeText={(text) => setPetDetail(text)}
                      placeholder="ex_웰시코기"
                      placeholderTextColor={colors.grey_400}
                      style={{
                        flexGrow: 1,
                        borderBottomLeftRadius: 0,
                        borderTopLeftRadius: 0,
                      }}
                      returnKeyType="done"
                    />
                  </InputBox>
                </CategoryBlock>
                <InputBox>
                  <Detail_Text color={colors.grey_800}>한줄소개</Detail_Text>
                  <InputBlock
                    editable
                    onChangeText={(text) => setPetIntro(text)}
                    placeholder="한줄소개를 입력해주세요.(20자이내)"
                    placeholderTextColor={colors.grey_400}
                    returnKeyType="done"
                  />
                </InputBox>
              </InfoContainer>
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
              <BottomTitleText>펫 프로필 등록</BottomTitleText>
            </BottomTitle>
            <ProfileImageModal profileUrl={petImageUrl} setProfileUrl={setPetImageUrl} accessToken={ACCESSTOKEN} />
          </BottomSheetModal>
        </ScreenLayout>
      </BottomSheetModalProvider>
    </>
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
const InputBox = styled.View`
  flex-direction: row;
  background-color: ${colors.grey_150};
  padding: 12px;
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
const InfoContainer = styled.View`
  gap: 8px;
  margin: 0px 16px;
`
const CategoryBlock = styled.View`
  flex-direction: row;
  gap: 8px;
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
