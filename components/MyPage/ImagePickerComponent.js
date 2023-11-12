import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import axios from 'axios'
//import ImageResizer from "react-native-image-resizer";
import * as ImageManipulator from 'expo-image-manipulator'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { BodySm_Text } from '../Fonts'

export const ImagePickerComponent = (props) => {
  const ACCESSTOKEN = props.accessToken
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
  // const {status_roll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission()
      if (!permission.granted) {
        return null
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.7,
      aspect: [1, 1],
    })
    if (result.canceled) {
      return null
    }
    props.setImageUrl(result.assets[0].uri)

    const url = 'https://dev.pawith.com/user'
    const localUri = result.assets[0].uri

    const compressedImageUri = await ImageManipulator.manipulateAsync(localUri, [{ resize: { width: 100 } }], {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
    })
    const routeData = new FormData()
    routeData.append('profileImage', {
      uri: compressedImageUri.uri,
      name: 'photo.jpeg',
      type: 'image/jpeg',
    })
    console.log(routeData._parts)
  }

  return (
    <LibraryBox onPress={() => uploadImage()}>
      <BodySm_Text color={colors.red_350}>라이브러리에서 선택</BodySm_Text>
    </LibraryBox>
  )
}

export default ImagePickerComponent

const LibraryBox = styled.TouchableOpacity`
  width: 156px;
  height: 44px;
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.red_200};
`
