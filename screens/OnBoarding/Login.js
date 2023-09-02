import React from "react";
import { styled } from "styled-components/native";

export default function Login() {
  return (
    <Container>
      <SymbolContainer>
        <SymbolIcon />
      </SymbolContainer>
      <Button>
        <ButtonText>Google로 시작하기</ButtonText>
      </Button>
      <Button>
        <ButtonText>Kakao로 시작하기</ButtonText>
      </Button>
      <Button>
        <ButtonText>Apple로 시작하기</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  padding: 0px 16px;
`;
const SymbolContainer = styled.View`
  margin-top: 109px;
  margin-bottom: 63px;
  align-items: center;
`;
const SymbolIcon = styled.View`
  width: 112px;
  height: 112px;
  background-color: pink;
`;

const Button = styled.TouchableOpacity`
  margin-bottom: 16px;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px black;
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text`
  color: black;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
`;
