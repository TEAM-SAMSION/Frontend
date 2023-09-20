import React from "react";
import { Text, View } from "react-native";
import { ScreenLayout } from "../../components/Shared";
import styled from "styled-components/native";
import { colors } from "../../colors";

export default function Account() {
  const SocialAccount = "카카오톡";

  return (
    <ScreenLayout>
      <ContentContainer>
        <ContentText>연결된 계정</ContentText>
        <AccountText>{SocialAccount}</AccountText>
      </ContentContainer>
      <ContentContainer>
        <ContentText>계정 탈퇴</ContentText>
      </ContentContainer>
    </ScreenLayout>
  );
}

const ContentContainer = styled.TouchableOpacity`
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
const AccountText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.grey_450};
`;
