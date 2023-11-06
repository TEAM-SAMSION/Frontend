import styled from 'styled-components/native'
import { colors } from '../../colors'
import ImagePickerComponent from './ImagePickerComponent'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { BodySm_Text } from '../Fonts'

export const ProfileImageModal = (props) => {
  const ACCESSTOKEN = props.accessToken
  const [imageUrl, setImageUrl] = useState(`${props.profileUrl}`)

  const uploadDefaultImage = async () => {
    const url = 'https://dev.pawith.com/user'
    const defaultData = new FormData()
    defaultData.append('profileImage', {
      uri: 'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/profileDefault.png',
      name: 'photo.jpeg',
      type: 'image/jpeg',
    })
    console.log(defaultData)

    try {
      const response = await axios.post(url, defaultData, {
        headers: {
          'Content-Type': `multipart/form-data`,
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      })
      console.log(response.data.imageUrl)
      props.setProfileUrl('https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/profileDefault.png')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <ModalContainer>
        <ImageContainer>
          <ProfileImage source={{ uri: `${props.profileUrl}` }} />
        </ImageContainer>
        <BoxContainer>
          <DefaultBox onPress={uploadDefaultImage}>
            <BodySm_Text color={colors.red_350}>기본 프로필로 선택</BodySm_Text>
          </DefaultBox>
          <ImagePickerComponent setImageUrl={props.setProfileUrl} accessToken={ACCESSTOKEN} />
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
