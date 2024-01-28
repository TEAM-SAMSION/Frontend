import { useCallback, useEffect, useRef, useState } from 'react'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodySm_Text, Body_Text, Detail_Text } from '../../components/Fonts'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableWithoutFeedback,
} from '@gorhom/bottom-sheet'
import { ScreenLayout, ScreenWidth } from '../../components/Shared'
import EditIcon from '../../assets/Svgs/Edit.svg'
import RNFS from 'react-native-fs'
import { PetImageModal } from '../../components/Home/PetImageModal'

export default function AddPetProfile({ route, navigation }) {
  const [enabled, setEnabled] = useState(false)
  const [petImageUrl, setPetImageUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/profileDefault.png',
  )
  const [petName, setPetName] = useState('')
  const [petAge, setPetAge] = useState()
  const [petCategory, setPetCategroy] = useState('')
  const [petDetail, setPetDetail] = useState('')
  const [petIntro, setPetIntro] = useState('')
  // const [petFile, setPetFile] = useState('file://' + RNFS.MainBundlePath + '/default_pet.png')//*** */
  const [petFile, setPetFile] = useState(RNFS.DocumentDirectoryPath + '/default_pet.png')
  // onFocus
  const [onName, setOnName] = useState(false)
  const [onAge, setOnAge] = useState(false)
  const [onIntro, setOnIntro] = useState(false)
  const [onCategory, setOnCategory] = useState(false)
  const [onDetail, setOnDetail] = useState(false)

  useEffect(() => {
    const isEmpty =
      petName === '' ||
      petAge === '' ||
      petCategory === '' ||
      petDetail === '' ||
      petIntro === '' ||
      petName.length > 20 ||
      petCategory.length > 10 ||
      petDetail.length > 10 ||
      petIntro.length > 20
    setEnabled(!isEmpty)

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            const result = completeAddingPet(petName, petAge, petIntro, petCategory, petDetail, petImageUrl, petFile)
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
  }, [enabled, petName, petAge, petCategory, petDetail, petIntro, petFile, petImageUrl])

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['40%']
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetModalRef.current?.present()
  }, [])
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
    [],
  )

  const completeAddingPet = (name, age, intro, category, detail, petImageUrl, petFile) => {
    const newPetArray = {
      name: name,
      age: age,
      description: intro,
      genus: category,
      species: detail,
      profileUrl: petImageUrl,
      file: petFile,
    }
    return newPetArray
  }

  return (
    <>
      <BottomSheetModalProvider>
        <ScreenLayout>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
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
                <InputBox
                  style={{
                    borderWidth: onName ? 1 : 0,
                    borderColor: onName ? (petName.length > 20 ? colors.primary_outline : 'rgba(0, 0, 0, 0.12)') : '',
                  }}
                >
                  <Detail_Text color={colors.grey_800}>이름</Detail_Text>
                  <InputBlock
                    editable
                    onChangeText={(text) => setPetName(text)}
                    placeholder="이름을 입력해주세요"
                    placeholderTextColor={colors.grey_400}
                    returnKeyType="done"
                    onFocus={() => setOnName(true)}
                    onBlur={() => setOnName(false)}
                    maxLength={23}
                  />
                </InputBox>
                {petName.length > 20 && (
                  <TextAlertBox>
                    <Detail_Text color={colors.primary_outline}>20자 이내로 입력해주세요</Detail_Text>
                  </TextAlertBox>
                )}
                <InputBox style={{ borderWidth: onAge ? 1 : 0, borderColor: onAge ? 'rgba(0, 0, 0, 0.12)' : '' }}>
                  <Detail_Text color={colors.grey_800}>나이</Detail_Text>
                  <InputBlock
                    editable
                    onChangeText={(text) => setPetAge(text)}
                    placeholder="나이를 입력해주세요"
                    placeholderTextColor={colors.grey_400}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onFocus={() => setOnAge(true)}
                    onBlur={() => setOnAge(false)}
                  />
                </InputBox>
                <CategoryBlock>
                  <ContentBlock>
                    <InputBox
                      style={{
                        width: (ScreenWidth - 40) / 2,
                        borderWidth: onCategory ? 1 : 0,
                        borderColor: onCategory
                          ? petCategory.length > 10
                            ? colors.primary_outline
                            : 'rgba(0, 0, 0, 0.12)'
                          : '',
                      }}
                    >
                      <Detail_Text color={colors.grey_800}>펫 종</Detail_Text>
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
                        onFocus={() => setOnCategory(true)}
                        onBlur={() => setOnCategory(false)}
                        maxLength={12}
                      />
                    </InputBox>
                    {petCategory.length > 10 && (
                      <TextAlertBox>
                        <Detail_Text color={colors.primary_outline}>10자 이내로 입력해주세요</Detail_Text>
                      </TextAlertBox>
                    )}
                  </ContentBlock>
                  <ContentBlock>
                    <InputBox
                      style={{
                        width: (ScreenWidth - 40) / 2,
                        borderWidth: onDetail ? 1 : 0,
                        borderColor: onDetail
                          ? petDetail.length > 10
                            ? colors.primary_outline
                            : 'rgba(0, 0, 0, 0.12)'
                          : '',
                      }}
                    >
                      <Detail_Text color={colors.grey_800}>종류</Detail_Text>
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
                        onFocus={() => setOnDetail(true)}
                        onBlur={() => setOnDetail(false)}
                        maxLength={12}
                      />
                    </InputBox>
                    {petDetail.length > 10 && (
                      <TextAlertBox>
                        <Detail_Text color={colors.primary_outline}>10자 이내로 입력해주세요</Detail_Text>
                      </TextAlertBox>
                    )}
                  </ContentBlock>
                </CategoryBlock>
                <InputBox
                  style={{
                    borderWidth: onIntro ? 1 : 0,
                    borderColor: onIntro ? (petIntro.length > 20 ? colors.primary_outline : 'rgba(0, 0, 0, 0.12)') : '',
                  }}
                >
                  <Detail_Text color={colors.grey_800}>한줄소개</Detail_Text>
                  <InputBlock
                    editable
                    onChangeText={(text) => {
                      setPetIntro(text)
                    }}
                    placeholder="한줄소개를 입력해주세요 (20자이내)"
                    placeholderTextColor={colors.grey_400}
                    returnKeyType="done"
                    onFocus={() => setOnIntro(true)}
                    onBlur={() => setOnIntro(false)}
                    maxLength={25}
                  />
                </InputBox>
                {petIntro.length > 20 && (
                  <TextAlertBox>
                    <Detail_Text color={colors.primary_outline}>20자 이내로 입력해주세요</Detail_Text>
                  </TextAlertBox>
                )}
              </InfoContainer>
            </View>
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
            <PetImageModal
              profileUrl={petImageUrl}
              setProfileUrl={setPetImageUrl}
              setPetFile={setPetFile}
              closeFunction={() => bottomSheetModalRef.current?.dismiss()}
            />
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
  padding-left: 12px;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
`
const InputBlock = styled.TextInput`
  width: 80%;
  padding: 12px;
  font-family: 'Spoqa-Medium';
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
const TextAlertBox = styled.View`
  align-items: flex-end;
  margin-right: 5px;
`
const ContentBlock = styled.View`
  align-items: flex-end;
  gap: 8px;
`
