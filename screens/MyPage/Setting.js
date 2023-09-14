import React from "react";
import { Text, View } from "react-native";
import { ScreenLayout } from "../../components/Shared";
import { styled } from "styled-components/native";

export default function Setting() {
  return (
    <ScreenLayout>
      <ContentContainer>
        <ContentText>계정</ContentText>
        <TouchableIcon>
          <ContentIcon />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer>
        <ContentText>포잇가이드</ContentText>
        <TouchableIcon>
          <ContentIcon />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer>
        <ContentText>개인정보처리방침</ContentText>
        <TouchableIcon>
          <ContentIcon />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer>
        <ContentText>앱 정보</ContentText>
      </ContentContainer>
      <ContentContainer>
        <ContentText>공지사항</ContentText>
      </ContentContainer>
    </ScreenLayout>
  );
}

const ContentContainer = styled.View`
  padding: 16px;
  padding-left: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ContentText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;
const TouchableIcon = styled.TouchableOpacity``;
const ContentIcon = styled.Image`
  width: 16px;
  height: 16px;
  background-color: pink;
`;
