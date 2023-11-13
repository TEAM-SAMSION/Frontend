import { useCallback, useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Animated,
  ScrollView,
} from 'react-native'
import { colors } from '../../colors'
import { ModalPopUp, ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import PlusIcon from '../../assets/Svgs/miniPlus.svg'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { ProfileImageModal } from '../../components/Home/ProfileImageModal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import SlideItem from '../../components/Home/SlideItem'
import { profileSample, profileSample2 } from '../../datas/Home/data'
import { BodyBold_Text, BodySm_Text, Body_Text, Detail_Text } from '../../components/Fonts'
import { getTeamCode, postTeamInfo } from '../../components/Home/Apis'
import { TabBarAtom } from '../../recoil/TabAtom'
import { useIsFocused } from '@react-navigation/native'
import EditIcon from '../../assets/Svgs/Edit.svg'
import Clipboard from '@react-native-clipboard/clipboard'
import { AddPetBox } from '../../components/Home/AddPetBox'
import RNFS from 'react-native-fs'

export default function CreateTeam({ route, navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)

  const [enabled, setEnabled] = useState(false)
  const [pamilyName, setPamilyName] = useState('')
  const [pamilyCode, setPamilyCode] = useState('')
  const [pamilyIntro, setPamilyIntro] = useState('')
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/default_pamily.png',
  )
  const [savedPets, setSavedPets] = useState([])
  const [pamilyFile, setPamilyFile] = useState('file://' + RNFS.MainBundlePath + '/default_pamily.png')
  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  const [deleteVisible, setDeleteVisible] = useState(false)
  const swipeableRefs = useRef([])
  const [deletePetInfo, setDeletePetInfo] = useState('')

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  useEffect(() => {
    try {
      const { result } = route.params || { result: [] } // route.params가 undefined일 경우 빈 배열로 설정
      console.log(result)
      const resultArray = Array.isArray(result) ? result : [result]
      setSavedPets((prevArray) => [...prevArray, ...resultArray])
    } catch (error) {
      console.error('Error in useEffect:', error)
    }
  }, [route.params])

  useEffect(() => {
    const isEmpty = pamilyName === '' || pamilyCode === '' || pamilyIntro === '' || savedPets.length == 0
    setEnabled(!isEmpty)
  }, [pamilyName, pamilyCode, pamilyIntro, savedPets])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            navigation.navigate('Home')
            createPamily()
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

  const bottomSheetModalRef = useRef(null)
  const snapPoints = ['60%']
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
    [],
  )

  const createTeamCode = () => {
    getTeamCode(ACCESSTOKEN).then((result) => {
      setPamilyCode(result)
    })
  }

  const copyTeamCode = () => {
    Clipboard.setString(pamilyCode)
  }

  const deletePet = (deletePetInfo) => {
    const updatedPet = savedPets.filter((item) => item !== deletePetInfo)
    setSavedPets(updatedPet)
  }

  const pamilyData = new FormData()

  const createPamily = () => {
    pamilyData.append('teamImageFile', {
      uri: pamilyFile,
      name: `teamImageFile`,
      type: 'image/png',
    })
    savedPets.map((item, index) => {
      pamilyData.append(`petimageFiles`, {
        uri: item.file,
        name: `petimageFiles`,
        type: 'image/png',
      })
    })
    const petInfo = savedPets.map(({ profileUrl, file, ...rest }) => rest)
    const teamInfo = {
      teamName: pamilyName,
      description: pamilyIntro,
      randomCode: pamilyCode,
      petRegisters: petInfo,
    }
    const json = JSON.stringify(teamInfo)
    const blob = new Blob([json], { type: 'application/json' })
    pamilyData.append('todoTeamCreateInfo', blob)
    console.log(pamilyData._parts)
    postTeamInfo(ACCESSTOKEN, pamilyData)
  }

  return (
    <BottomSheetModalProvider>
      <ScreenLayout>
        <ScrollView>
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
                <Block
                  onPress={() => navigation.navigate('AddPetProfile')}
                  style={
                    savedPets.length <= 0
                      ? {}
                      : {
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                          borderBottomWidth: 1,
                          borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                        }
                  }
                >
                  <Detail_Text>펫 프로필</Detail_Text>
                  <PlusIcon width={16} height={16} />
                </Block>
              </Container>
              <PetBlock>
                {savedPets.length < 0
                  ? ''
                  : savedPets.map((pet, index) => (
                      <AddPetBox
                        key={index}
                        pet={pet}
                        grey={true}
                        navigation={navigation}
                        handleDelete={() => {
                          setDeletePetInfo(pet)
                          setDeleteVisible(true)
                        }}
                        handleEdit={() => {
                          deletePet(pet)
                        }}
                        swipeableRef={(ref) => (swipeableRefs.current[pet] = ref)}
                      />
                    ))}
              </PetBlock>
            </>
          </TouchableWithoutFeedback>
          <ModalPopUp visible={deleteVisible} petIcon={false} height={217}>
            <PopContent>
              <BodyBold_Text color={colors.grey_700}>{deletePetInfo.name}</BodyBold_Text>
              <Body_Text color={colors.grey_500}>을 내보내시겠습니까?</Body_Text>
            </PopContent>
            <PopButtonContainer>
              <PopButton
                onPress={() => {
                  setDeleteVisible(false)
                  swipeableRefs.current[deletePetInfo]?.close()
                }}
                style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
              >
                <BodySm_Text color={colors.red_350}>아니오</BodySm_Text>
              </PopButton>
              <PopButton
                onPress={() => {
                  deletePet(deletePetInfo)
                  setDeleteVisible(false)
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
            <ProfileImageModal
              profileUrl={profileUrl}
              setProfileUrl={setProfileUrl}
              bottomRef={bottomSheetModalRef}
              setImageFile={setPamilyFile}
            />
          </BottomSheetModal>
        </ScrollView>
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
const PetBlock = styled.View`
  margin: 0px 16px;
  background-color: ${colors.grey_150};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
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
