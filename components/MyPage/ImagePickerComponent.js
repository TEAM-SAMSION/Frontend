import React from "react";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import { colors } from "../../colors";
import axios from "axios";
import ImageResizer from "react-native-image-resizer";
import * as ImageManipulator from "expo-image-manipulator";

const ACCESSTOKEN =
  "eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl90eXBlIjoiQUNDRVNTX1RPS0VOIiwiZW1haWwiOiJ0ZXN0IiwiaXNzIjoicGF3aXRoIiwiaWF0IjoxNjk1MTM0OTYxLCJleHAiOjE2OTUyMjEzNjF9.JpmiVeEsrIxNB814EvZJCRzbW96T_bNvmohQm3SamBcap3H-bzpyCIsK_1kaBd-w";

const ImagePickerComponent = (props) => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const showPicker = () => {
    launch;
  };
  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.2,
      aspect: [1, 1],
    });
    if (result.canceled) {
      return null;
    }
    console.log(result);
    props.setImageUrl(result.assets[0].uri);
    //이미지 변경 API 적용 후 SET?!

    const url = "https://dev.pawith.com/user";
    const localUri = result.assets[0].uri;
    console.log(localUri);
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : `image`;

    // const compressedImageUri = await ImageResizer.createResizedImage(
    //   localUri,
    //   800,
    //   800,
    //   "JPEG",
    //   Math.floor(result.assets[0].size / (1024 * 1024)) <= 2
    //     ? Math.floor(result.assets[0].size / (1024 * 1024)) * 0.8
    //     : 0.5
    // );

    const compressedImageUri = await ImageManipulator.manipulateAsync(
      localUri,
      [{ resize: { width: 400 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    const formData = new FormData();
    formData.append("imageFile", {
      uri: compressedImageUri.uri,
      name: filename,
      type,
    });
    console.log(formData);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      });
      console.log(response.data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LibraryBox onPress={uploadImage}>
      <LibraryText>라이브러리에서 선택</LibraryText>
    </LibraryBox>
  );
};

export default ImagePickerComponent;

const LibraryBox = styled.TouchableOpacity`
  height: 44px;
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
`;
const LibraryText = styled.Text`
  color: ${colors.grey_100};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  text-align: center;
`;