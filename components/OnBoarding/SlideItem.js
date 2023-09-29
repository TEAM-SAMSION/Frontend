import React from "react";
import { Dimensions, View } from "react-native";
import { styled } from "styled-components/native";
import { ScreenWidth } from "../Shared";

const SlideItem = ({ item }) => {
  return (
    <SlideBase>
      <TextContainer>
        <TitleText>{item.title}</TitleText>
        <ContentText>{item.content}</ContentText>
      </TextContainer>
      <ImageContainer>
        <Image source={item.image} />
      </ImageContainer>
    </SlideBase>
  );
};

export default SlideItem;

const SlideBase = styled.View`
  width: ${ScreenWidth};
  justify-content: space-between;
`;
const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
`;
const TitleText = styled.Text`
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 43px;
`;
const ContentText = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;
const ImageContainer = styled.View`
  justify-content: end;
  margin-bottom: 64px;
`;
const Image = styled.Image`
  width: 100%;
`;
