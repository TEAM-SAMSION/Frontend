import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import axios from 'axios'
import * as ImageManipulator from 'expo-image-manipulator'
import { BodySm_Text } from '../Fonts'

export const ImagePickerComponent = (props) => {
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
      allowsEditing: false,
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
    props.setBottomProfileUrl(localUri)
    props.setImageFile(compressedImageUri.uri)
  }

  return (
    <SampleImageContainer onPress={() => uploadImage()}>
      <SampleImage source={require('../../assets/Imgs/sample_library.png')} />
    </SampleImageContainer>
  )
}

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
`
