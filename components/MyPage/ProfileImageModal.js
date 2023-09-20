import styled from "styled-components/native";
import { colors } from "../../colors";
import ImagePickerComponent from "./ImagePickerComponent";
import { useState } from "react";

export const ProfileImageModal = (props) => {
  const [imageUrl, setImageUrl] = useState(`${props.profileUrl}`);

  const setDefaultImage = () => {
    setImageUrl(
      "https://pawith.s3.ap-northeast-2.amazonaws.com/44b0a657-e8fc-4bb3-883d-baf67a9c5d67.png"
    );
  };

  return (
    <>
      <ModalContainer>
        <ImageContainer>
          <ProfileImage source={{ uri: `${imageUrl}` }} />
        </ImageContainer>
        <BoxContainer>
          <DefaultBox onPress={setDefaultImage}>
            <DefaultText>기본 프로필로 선택</DefaultText>
          </DefaultBox>
          <ImagePickerComponent setImageUrl={setImageUrl} />
        </BoxContainer>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.View``;
const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;
const ProfileImage = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
`;
const BoxContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
const DefaultBox = styled.TouchableOpacity`
  border: 2px solid;
  border-color: ${colors.primary};
  height: 44px;
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
`;
const DefaultText = styled.Text`
  color: ${colors.primary};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  text-align: center;
`;
