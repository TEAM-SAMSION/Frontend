import React from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native";
import { styled } from "styled-components/native";

const SlideItem = ({ item }) => {
  const screenWidth = Math.round(Dimensions.get("window").width);

  return (
    <View style={{ width: screenWidth - 32 }}>
      <TextContainer>
        <TitleText>{item.title}</TitleText>
        <ContentText>{item.content}</ContentText>
      </TextContainer>
      <ImageContainer>
        <Image item={item} />
      </ImageContainer>
    </View>
  );
};

export default SlideItem;

const TextContainer = styled.View`
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
  margin-top: 78px;
  align-items: center;
  justify-content: center;
`;
const Image = styled.View`
  width: 343px;
  height: 280px;
  background-color: ${({ item }) => item.color};
`;
