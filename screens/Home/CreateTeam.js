import { useCallback, useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, View } from 'react-native'
import { colors } from '../../colors'
import { ModalPopUp, ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import PlusIcon from '../../assets/Svgs/miniPlus.svg'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { ProfileImageModal } from '../../components/Home/ProfileImageModal'
import { useRecoilState, useSetRecoilState } from 'recoil'
import BackButton from '../../assets/Svgs/chevron_back.svg'
import {
  BodyBold_Text,
  BodySm_Text,
  Body_Text,
  Detail_Text,
  HeadLineSm_Text,
  SubHead_Text,
} from '../../components/Fonts'
import { getLatestTeam, getTeamCode, postTeamInfo } from '../../components/Home/Apis'
import { SelectedTeamAtom, TabBarAtom } from '../../recoil/TabAtom'
import { CommonActions, useIsFocused } from '@react-navigation/native'
import EditIcon from '../../assets/Svgs/Edit.svg'
import Clipboard from '@react-native-clipboard/clipboard'
import { AddPetBox } from '../../components/Home/AddPetBox'
import RNFS from 'react-native-fs'
import Close from '../../assets/Svgs/Close.svg'
import ErrorIcon from '../../assets/Svgs/error.svg'

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
  // const [pamilyFile, setPamilyFile] = useState('file://' + RNFS.MainBundlePath + '/default_pamily.png')//*** */
  const [pamilyFile, setPamilyFile] = useState(RNFS.DocumentDirectoryPath + '/default_pamily.png')

  const setSelectedTeam = useSetRecoilState(SelectedTeamAtom)

  // onFocus
  const [onName, setOnName] = useState(false)
  const [onIntro, setOnIntro] = useState(false)

  // 펫 삭제 팝업
  const [deleteVisible, setDeleteVisible] = useState(false)
  const swipeableRefs = useRef(null)
  const [deletePetInfo, setDeletePetInfo] = useState('')

  // 뒤로가기 팝업
  const [backVisible, setBackVisible] = useState(false)

  // 패밀리 생성 팝업
  const [createVisible, setCreateVisible] = useState(false)

  // 패밀리 생성 완료 팝업
  const [completeVisible, setCompleteVisible] = useState(false)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  useEffect(() => {
    try {
      const { result } = route.params || { result: [] } // route.params가 undefined일 경우 빈 배열로 설정
      const resultArray = Array.isArray(result) ? result : [result]
      setSavedPets((prevArray) => [...prevArray, ...resultArray])
    } catch (error) {
      console.error('Error in useEffect:', error)
    }
  }, [route.params])

  useEffect(() => {
    const isEmpty =
      pamilyName === '' ||
      pamilyCode === '' ||
      pamilyIntro === '' ||
      savedPets.length == 0 ||
      pamilyName.length > 20 ||
      pamilyIntro.length > 20
    setEnabled(!isEmpty)
  }, [pamilyName, pamilyCode, pamilyIntro, savedPets])

  useEffect(() => {
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
          onPress={() => {
            setCreateVisible(true)
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
    getTeamCode().then((result) => {
      setPamilyCode(result)
    })
  }

  const copyText = `초대코드: ${pamilyCode}${'\n'}참여방법: 포잇 > Pamily 참여하기 > 코드 입력`
  const copyTeamCode = () => {
    Clipboard.setString(copyText)
  }

  const deletePet = (deletePetInfo) => {
    const updatedPet = savedPets.filter((item) => item !== deletePetInfo)
    setSavedPets(updatedPet)
  }

  const createPamily = () => {
    const pamilyData = new FormData()
    pamilyData.append('teamImageFile', {
      uri: pamilyFile,
      name: `teamImageFile.png`,
      type: 'image/png',
    })
    savedPets.forEach((item) => {
      pamilyData.append(`petimageFiles`, {
        uri: item.file,
        name: `petimageFiles.png`,
        type: 'image/png',
      })
    })
    const teamInfo = {
      teamName: pamilyName,
      randomCode: pamilyCode,
      description: pamilyIntro,
      petRegisters: savedPets.map(({ profileUrl, file, ...rest }) => rest),
    }
    const json = JSON.stringify(teamInfo)
    pamilyData.append('todoTeamCreateInfo', { string: json, type: 'application/json' })
    console.log('pamilyData:', JSON.stringify(pamilyData))
    postTeamInfo(pamilyData).then(() => {
      getLatestTeam().then((result) => {
        let tempArr = { id: result.teamId, name: result.teamName, auth: result.authority }
        console.log('topTeam Changed', tempArr)
        setSelectedTeam(tempArr)
      })
    })
  }

  return (
    <BottomSheetModalProvider>
      <ScreenLayout>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <InputBox style={{ paddingRight: 12 }}>
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
            <InputBox
              style={{
                borderWidth: onName ? 1 : 0,
                borderColor: onName ? (pamilyName.length > 20 ? colors.primary_outline : 'rgba(0, 0, 0, 0.12)') : '',
              }}
            >
              <Detail_Text color={colors.grey_800}> Pamily 이름</Detail_Text>
              <InputBlock
                editable
                onChangeText={(text) => setPamilyName(text)}
                placeholder="이름을 입력해주세요"
                placeholderTextColor={colors.grey_400}
                returnKeyType="done"
                onFocus={() => setOnName(true)}
                onBlur={() => setOnName(false)}
                maxLength={23}
              />
            </InputBox>
            {pamilyName.length > 20 && (
              <TextAlertBox>
                <Detail_Text color={colors.primary_outline}>20자 이내로 입력해주세요</Detail_Text>
              </TextAlertBox>
            )}
            <InputBox
              style={{
                borderWidth: onIntro ? 1 : 0,
                borderColor: onIntro ? (pamilyIntro.length > 20 ? colors.primary_outline : 'rgba(0, 0, 0, 0.12)') : '',
              }}
            >
              <Detail_Text color={colors.grey_800}>한줄소개</Detail_Text>
              <InputBlock
                editable
                onChangeText={(text) => setPamilyIntro(text)}
                placeholder="한줄소개를 입력해주세요 (20자이내)"
                placeholderTextColor={colors.grey_400}
                keyboardType="number"
                returnKeyType="done"
                onFocus={() => setOnIntro(true)}
                onBlur={() => setOnIntro(false)}
                maxLength={25}
              />
            </InputBox>
            {pamilyIntro.length > 20 && (
              <TextAlertBox>
                <Detail_Text color={colors.primary_outline}>20자 이내로 입력해주세요</Detail_Text>
              </TextAlertBox>
            )}
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
              <Detail_Text>펫 등록</Detail_Text>
              <PlusIcon width={16} height={16} color={colors.grey_600} />
            </Block>
            {savedPets.length > 0 ? (
              ''
            ) : (
              <AlertBox>
                <ErrorBox>
                  <ErrorIcon width={12} height={12} color={colors.primary_outline} />
                </ErrorBox>
                <Detail_Text color={colors.grey_400}>펫을 1마리 이상을 등록해야 Pamily 생성이 가능합니다</Detail_Text>
              </AlertBox>
            )}
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
                    onSwipeableOpenHandler={(ref) => {
                      if (swipeableRefs.current && ref !== swipeableRefs.current) {
                        swipeableRefs.current.close()
                        swipeableRefs.current = null
                      }
                      swipeableRefs.current = ref
                    }}
                  />
                ))}
          </PetBlock>
          <ModalPopUp visible={deleteVisible} petIcon={false} height={217}>
            <PopContent style={{ flexWrap: 'wrap' }}>
              <BodyBold_Text color={colors.grey_700}>{deletePetInfo.name}</BodyBold_Text>
              <Body_Text color={colors.grey_500}>을 내보내시겠습니까?</Body_Text>
            </PopContent>
            <PopButtonContainer>
              <PopButton
                onPress={() => {
                  setDeleteVisible(false)
                  swipeableRefs.current.close()
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
          <ModalPopUp visible={backVisible} petIcon={false} height={204}>
            <PopContent style={{ flexDirection: 'column', marginTop: 54, marginBottom: 46 }}>
              <BodyBold_Text color={colors.grey_600}>취소하시겠습니까?</BodyBold_Text>
              <BodyBold_Text color={colors.grey_600}>입력하신 정보는 저장되지 않습니다</BodyBold_Text>
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
          <ModalPopUp visible={createVisible} petIcon={false} height={217}>
            <PopContent style={{ flexDirection: 'column', marginTop: 43, marginBottom: 44 }}>
              <SubHead_Text color={colors.grey_700} style={{ textAlign: 'center' }}>
                {pamilyName}
              </SubHead_Text>
              <HeadLineSm_Text color={colors.grey_500}>Pamily를 생성하시겠습니까?</HeadLineSm_Text>
            </PopContent>
            <PopButtonContainer>
              <PopButton
                onPress={() => {
                  setCreateVisible(false)
                }}
                style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
              >
                <BodySm_Text color={colors.red_350}>아니오</BodySm_Text>
              </PopButton>
              <PopButton
                onPress={() => {
                  createPamily()
                  setCreateVisible(false)
                  setCompleteVisible(true)
                }}
              >
                <BodySm_Text color={colors.red_350}>예</BodySm_Text>
              </PopButton>
            </PopButtonContainer>
          </ModalPopUp>
          <ModalPopUp visible={completeVisible} petIcon={false} height={217}>
            <ModalHeader>
              <CloseButton
                onPress={() => {
                  setCompleteVisible(false)
                  navigation.dispatch(
                    CommonActions.reset({
                      routes: [{ name: 'Home' }],
                    }),
                  )
                  navigation.navigate('ToDoNav', { screen: 'todo' })
                }}
              >
                <Close width={24} height={24} color={colors.grey_600} />
              </CloseButton>
            </ModalHeader>
            <PopContent style={{ flexDirection: 'column', marginTop: 0, marginBottom: 39, gap: 4 }}>
              <SubHead_Text color={colors.grey_700}>Pamily 생성 완료!</SubHead_Text>
              <View style={{ alignItems: 'center' }}>
                <HeadLineSm_Text color={colors.grey_500}>지금 나와 함께 할</HeadLineSm_Text>
                <HeadLineSm_Text color={colors.grey_500}>다른 Pamily를 초대해주세요!</HeadLineSm_Text>
              </View>
            </PopContent>
            <PopButtonContainer>
              <PopButton
                onPress={() => {
                  copyTeamCode()
                  setCompleteVisible(false)
                  navigation.dispatch(
                    CommonActions.reset({
                      routes: [{ name: 'Home' }],
                    }),
                  )
                  navigation.navigate('ToDoNav', { screen: 'todo' })
                }}
              >
                <BodySm_Text color={colors.red_350}>초대링크 복사하기</BodySm_Text>
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
const CloseButton = styled.TouchableOpacity``
const ModalHeader = styled.View`
  width: '100%';
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 24px;
`
const ErrorBox = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  border: 1px solid ${colors.primary_outline};
  justify-content: center;
  align-items: center;
`
const AlertBox = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
  margin-left: 12px;
  margin-top: 6px;
`
const TextAlertBox = styled.View`
  align-items: flex-end;
  margin-right: 5px;
`
