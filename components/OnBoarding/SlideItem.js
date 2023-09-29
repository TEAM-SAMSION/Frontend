import React from "react";
import { Dimensions, View } from "react-native";
import { styled } from "styled-components/native";

const SlideItem = ({ item }) => {
  const screenWidth = Math.round(Dimensions.get("window").width);

  return (
    <View style={{ width: screenWidth }}>
      <TextContainer>
        <TitleText>{item.title}</TitleText>
        <ContentText>{item.content}</ContentText>
      </TextContainer>
      <ImageContainer>
        <Image source={item.image} />
      </ImageContainer>
    </View>
  );
};

export default SlideItem;

const TextContainer = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  height: 153px;
  margin-top: 48px;
  padding-left: 14px;
  gap: 10px;
`;
const TitleText = styled.Text`
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 43px;
`;
const ContentText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;
const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
const Image = styled.Image`
  height: 325px;
`;
