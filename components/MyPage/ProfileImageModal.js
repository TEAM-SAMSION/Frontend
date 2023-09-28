import styled from "styled-components/native";
import { colors } from "../../colors";
import ImagePickerComponent from "./ImagePickerComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { AccessTokenAtom } from "../../recoil/AuthAtom";

// const ACCESSTOKEN = useRecoilValue(AccessTokenAtom);
const ACCESSTOKEN =
  "eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl90eXBlIjoiQUNDRVNTX1RPS0VOIiwiZW1haWwiOiJ0ZXN0IiwiaXNzIjoicGF3aXRoIiwiaWF0IjoxNjk1ODk1ODc2LCJleHAiOjE2OTU5ODIyNzZ9.i58lt1IYpj9YHOK1QZ3v3U0jjplv5SR4rkbQyM_qwCT3Tt2rbmVxi0U3BNuAUOcV";

export const ProfileImageModal = (props) => {
  const [imageUrl, setImageUrl] = useState(`${props.profileUrl}`);

  const uploadDefaultImage = async () => {
    const url = "https://dev.pawith.com/user";
    const defaultData = new FormData();
    defaultData.append("profileImage", {
      uri: "https://pawith.s3.ap-northeast-2.amazonaws.com/44b0a657-e8fc-4bb3-883d-baf67a9c5d67.png",
      name: "photo.jpeg",
      type: "image/jpeg",
    });
    console.log(defaultData);

    try {
      const response = await axios.post(url, defaultData, {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      });
      console.log(response.data.imageUrl);
      props.setProfileUrl(
        "https://pawith.s3.ap-northeast-2.amazonaws.com/44b0a657-e8fc-4bb3-883d-baf67a9c5d67.png"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ModalContainer>
        <ImageContainer>
          <ProfileImage source={{ uri: `${props.profileUrl}` }} />
        </ImageContainer>
        <BoxContainer>
          <DefaultBox onPress={uploadDefaultImage}>
            <DefaultText>기본 프로필로 선택</DefaultText>
          </DefaultBox>
          <ImagePickerComponent setImageUrl={props.setProfileUrl} />
        </BoxContainer>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.View`
  padding: 0px;
`;
const ImageContainer = styled.View`
  align-items: center;
  margin-top: 14px;
  margin-bottom: 24px;
`;
const ProfileImage = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
`;
const BoxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 0px 24px;
`;
const DefaultBox = styled.TouchableOpacity`
  border: 2px solid;
  border-color: ${colors.primary};
  width: 156px;
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
