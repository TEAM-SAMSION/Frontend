import { useCallback, useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodyBold_Text, BodySm_Text, Body_Text, Detail_Text } from '../../components/Fonts'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableWithoutFeedback,
} from '@gorhom/bottom-sheet'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { ModalPopUp, ScreenLayout, ScreenWidth } from '../../components/Shared'
import EditIcon from '../../assets/Svgs/Edit.svg'
import { PetImageModal } from '../../components/Home/PetImageModal'
import BackButton from '../../assets/Svgs/chevron_back.svg'
import { changePetInfo } from '../../components/Administrator/Apis'

export default function EditPet({ route, navigation }) {
  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  const data = route.params
  const petInfo = data.petInfo
  const teamId = data.teamId
  const [enabled, setEnabled] = useState(false)
  const [petImageUrl, setPetImageUrl] = useState(petInfo.profileUrl)
  const [petName, setPetName] = useState(petInfo.name)
  const [petAge, setPetAge] = useState(petInfo.age)
  const [petCategory, setPetCategroy] = useState(petInfo.genus)
  const [petDetail, setPetDetail] = useState(petInfo.species)
  const [petIntro, setPetIntro] = useState(petInfo.description)
  const [petFile, setPetFile] = useState(petInfo.file)
  const petId = petInfo.petId

  // 뒤로가기 팝업
  const [backVisible, setBackVisible] = useState(false)

  useEffect(() => {
    const isEmpty = petName === '' || petAge === '' || petCategory === '' || petDetail === '' || petIntro === ''
    setEnabled(!isEmpty)

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => setBackVisible(true)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 16,
          }}
        >
          <BackButton width={24} height={24} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={async () => {
            await editPet()
            navigation.navigate('ManagePet', { teamId })
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
  }, [enabled, petName, petAge, petCategory, petDetail, petIntro, petImageUrl, petFile])

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['40%']
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
    [],
  )

  const editPet = () => {
    const petData = new FormData()
    if (petInfo.profileUrl !== petImageUrl) {
      petData.append('petImageFile', {
        uri: petFile,
        name: `petImageFile.png`,
        type: 'image/png',
      })
    } else {
      petData.append('petImageFile', {})
    }
    const petDatas = {
      name: petName,
      age: petAge,
      petGenus: petCategory,
      petSpecies: petDetail,
      description: petIntro,
    }
    console.log(petDatas)
    const json = JSON.stringify(petDatas)
    petData.append('petUpdateInfo', { string: json, type: 'application/json' })
    changePetInfo(ACCESSTOKEN, petId, petData)
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
                    placeholder={petName}
                    placeholderTextColor={colors.grey_600}
                    returnKeyType="done"
                  />
                </InputBox>
                <InputBox>
                  <Detail_Text color={colors.grey_800}>나이</Detail_Text>
                  <InputBlock
                    editable
                    onChangeText={(text) => setPetAge(text)}
                    placeholder={`${petAge}`}
                    placeholderTextColor={colors.grey_600}
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
                      placeholder={petCategory}
                      placeholderTextColor={colors.grey_600}
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
                      placeholder={petDetail}
                      placeholderTextColor={colors.grey_600}
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
                    placeholder={petIntro}
                    placeholderTextColor={colors.grey_600}
                    returnKeyType="done"
                  />
                </InputBox>
              </InfoContainer>
            </>
          </TouchableWithoutFeedback>
          <ModalPopUp visible={backVisible} petIcon={false} height={204}>
            <PopContent style={{ flexDirection: 'column', marginTop: 54, marginBottom: 46 }}>
              <BodyBold_Text color={colors.grey_600}>취소하시겠습니까?</BodyBold_Text>
              <BodyBold_Text color={colors.grey_600}>입력하신 정보는 저장되지 않습니다.</BodyBold_Text>
            </PopContent>
            <PopButtonContainer>
              <PopButton
                onPress={() => {
                  setBackVisible(false)
                }}
                style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
              >
                <BodySm_Text color={colors.red_350}>아니오</BodySm_Text>
              </PopButton>
              <PopButton
                onPress={() => {
                  navigation.goBack()
                }}
              >
                <BodySm_Text color={colors.red_350}>예</BodySm_Text>
              </PopButton>
            </PopButtonContainer>
          </ModalPopUp>
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
              <BottomTitleText>펫 프로필 수정</BottomTitleText>
            </BottomTitle>
            <PetImageModal profileUrl={petImageUrl} setProfileUrl={setPetImageUrl} setPetFile={setPetFile} />
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
const PopContent = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 76px 0px 59px 0px;
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
