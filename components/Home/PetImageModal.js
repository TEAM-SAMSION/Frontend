import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodySm_Text } from '../Fonts'
import RNFS from 'react-native-fs'
import { PetImagePicker } from './PetImagePicker'

export const PetImageModal = (props) => {
  const changeSampleImage = async (file) => {
    props.setProfileUrl(`https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/profileDefault.png`)
    props.setPetFile('file://' + RNFS.MainBundlePath + '/default_pet.png')
  }

  return (
    <>
      <ModalContainer>
        <ImageContainer>
          <ProfileImage source={{ uri: `${props.profileUrl}` }} />
        </ImageContainer>
        <BoxContainer>
          <DefaultBox onPress={() => changeSampleImage()}>
            <BodySm_Text color={colors.red_350}>기본 프로필로 선택</BodySm_Text>
          </DefaultBox>
          <PetImagePicker setImageUrl={props.setProfileUrl} setPetFile={props.setPetFile} />
        </BoxContainer>
      </ModalContainer>
    </>
  )
}

const ModalContainer = styled.View`
  padding: 0px;
`
const ImageContainer = styled.View`
  align-items: center;
  margin-top: 14px;
  margin-bottom: 24px;
`
const ProfileImage = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
`
const BoxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 0px 24px;
`
const DefaultBox = styled.TouchableOpacity`
  border: 2px solid;
  border-color: ${colors.grey_150};
  width: 156px;
  height: 44px;
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
`
