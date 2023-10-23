import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import axios from 'axios'
import * as ImageManipulator from 'expo-image-manipulator'

export const ImagePickerComponent = () => {
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
    console.log(result)
    //   props.setImageUrl(result.assets[0].uri)

    //   const url = 'https://dev.pawith.com/user'
    //   const localUri = result.assets[0].uri
    //   console.log(localUri)

    //   const compressedImageUri = await ImageManipulator.manipulateAsync(localUri, [{ resize: { width: 100 } }], {
    //     compress: 1,
    //     format: ImageManipulator.SaveFormat.JPEG,
    //   })

    //   const routeData = new FormData()
    //   routeData.append('profileImage', {
    //     uri: compressedImageUri.uri,
    //     name: 'photo.jpeg',
    //     type: 'image/jpeg',
    //   })
    //   console.log(routeData)

    //   try {
    //     const response = await axios.post(url, routeData, {
    //       headers: {
    //         'Content-Type': `multipart/form-data`,
    //         Authorization: `Bearer ${ACCESSTOKEN}`,
    //       },
    //     })
    //     console.log(response.data.imageUrl)
    //   } catch (error) {
    //     console.error(error)
    //   }
  }

  return (
    <LibraryBox onPress={uploadImage}>
      <LibraryText>라이브러리에서 선택</LibraryText>
    </LibraryBox>
  )
}

const LibraryBox = styled.TouchableOpacity`
  width: 156px;
  height: 44px;
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
`
const LibraryText = styled.Text`
  color: ${colors.grey_100};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  text-align: center;
`
