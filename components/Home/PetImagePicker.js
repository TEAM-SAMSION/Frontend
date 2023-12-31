import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import * as ImageManipulator from 'expo-image-manipulator'
import { BodySm_Text } from '../Fonts'

export const PetImagePicker = (props) => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission()
      if (!permission.granted) {
        return null
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
      aspect: [1, 1],
    })
    if (result.canceled) {
      return null
    }

    const localUri = result.assets[0].uri

    const compressedImageUri = await ImageManipulator.manipulateAsync(localUri, [{ resize: { width: 100 } }], {
      compress: 1,
      format: ImageManipulator.SaveFormat.PNG,
    })

    props.setImageUrl(localUri)
    props.setPetFile(compressedImageUri.uri)
    props.closeFunction()
  }

  return (
    <LibraryBox onPress={() => uploadImage()}>
      <BodySm_Text color={colors.red_350}>라이브러리에서 선택</BodySm_Text>
    </LibraryBox>
  )
}

export default PetImagePicker

const LibraryBox = styled.TouchableOpacity`
  width: 156px;
  height: 44px;
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.red_200};
`
