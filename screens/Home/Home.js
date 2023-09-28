import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { ScreenLayout } from "../../components/Shared";
import { TopHeader } from "../../components/Home/TopHeader";
import styled from "styled-components/native";
import { colors } from "../../colors";
import Plus from "../../assets/Svgs/plus.svg";
import Go from "../../assets/Svgs/go.svg";
import axios from "axios";

export default function Home({ navigation }) {
  const [name, setName] = useState("포잇");
  const PamilyNum = 0;

  const ACCESSTOKEN =
    "eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl90eXBlIjoiQUNDRVNTX1RPS0VOIiwiZW1haWwiOiJ0ZXN0IiwiaXNzIjoicGF3aXRoIiwiaWF0IjoxNjk1ODk1ODc2LCJleHAiOjE2OTU5ODIyNzZ9.i58lt1IYpj9YHOK1QZ3v3U0jjplv5SR4rkbQyM_qwCT3Tt2rbmVxi0U3BNuAUOcV";

  const getUserInfo = async () => {
    try {
      const url = "https://dev.pawith.com/user";
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${ACCESSTOKEN}` },
      });
      setName(response.data.nickname);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScreenLayout>
      <TopHeader navigation={navigation} />
      <BannerContainer>
        <NickBox>
          <NicknameContainer>
            <NickText>{name} </NickText>
            <NickSubText>님,</NickSubText>
          </NicknameContainer>
          <SubText>오늘도 포잇과 함께 마이펫을 관리해볼까요?</SubText>
        </NickBox>
        <PamilyContainer>
          <PamilyChoiceToggle />
          <PamilyImageContainer>
            <Image
              source={require("../../assets/Imgs/Dog0.png")}
              style={{ width: 255, height: 255 }}
            />
          </PamilyImageContainer>
          <PamilyStatContainer>
            {PamilyNum == 0 ? (
              <NoneText>소속된 Pamily가 없습니다.</NoneText>
            ) : (
              <PamilyStat />
            )}
          </PamilyStatContainer>
        </PamilyContainer>
      </BannerContainer>
      {PamilyNum == 0 ? (
        <TeamContainer>
          <StartTeamContainer
            style={{
              shadowColor: "rgb(0,0,0)",
              shadowRadius: 4,
              shadowOpacity: 0.15,
              shadowOffset: [0, 0],
            }}
          >
            <Title>Pamily 생성하기</Title>
            <SubTitle>
              함께할 TODO Pamily를{"\n"}
              생성해 볼까요?
            </SubTitle>
            <StartIcon>
              <Plus />
            </StartIcon>
          </StartTeamContainer>
          <StartTeamContainer
            style={{
              shadowColor: "rgb(0,0,0)",
              shadowRadius: 4,
              shadowOpacity: 0.15,
              shadowOffset: [0, 0],
            }}
          >
            <Title>Pamily 들어가기</Title>
            <SubTitle>함께할 TODO Pamily를{"\n"}들어가 볼까요?</SubTitle>
            <StartIcon>
              <Go />
            </StartIcon>
          </StartTeamContainer>
        </TeamContainer>
      ) : (
        ""
      )}
    </ScreenLayout>
  );
}

const BannerContainer = styled.View`
  height: 398px;
  padding: 24px 16px;
  background-color: #ffe2e0;
`;
const NicknameContainer = styled.View`
  flex-direction: row;
`;
const NickBox = styled.View`
  padding-left: 8px;
`;
const NickText = styled.Text`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  color: #fd8d81;
`;
const NickSubText = styled.Text`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`;
const SubText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  color: ${colors.grey_600};
`;
const PamilyContainer = styled.View`
  height: 274px;
  border-radius: 16px;
  border: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 24px;
`;
const PamilyChoiceToggle = styled.View`
  width: 109px;
  height: 32px;
  background-color: white;
  margin: 12px 0px 0px 12px;
  z-index: 1;
`;
const PamilyImageContainer = styled.View`
  height: 255px;
  width: 100%;
  align-items: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  position: absolute;
  z-index: 0;
  bottom: 0px;
`;
const PamilyStatContainer = styled.View`
  width: 100%;
  height: 62px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 16px;
  position: absolute;
  z-index: 1;
  top: 210px;
`;
const NoneText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  color: ${colors.grey_400};
`;
const PamilyStat = styled.View``;
const TeamContainer = styled.View`
  flex-direction: row;
  background-color: ${colors.grey_150};
  justify-content: center;
  padding: 16px;
  gap: 8px;
  padding-bottom: 100px;
`;
const StartTeamContainer = styled.View`
  width: 170px;
  height: 159px;
  border-radius: 8px;
  background-color: ${colors.grey_100};
  padding: 16px 16px 0px 16px;
`;
const Title = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
`;
const SubTitle = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.6);
`;
const StartIcon = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
`;
