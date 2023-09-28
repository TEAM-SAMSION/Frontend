import styled from "styled-components/native";
import { colors } from "../../colors";
import { useState } from "react";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const MainStat = (props) => {
  const percentage = props.progress;
  const Percentage = styled.View`
    height: 100%;
    width: ${percentage}%;
    border-top-left-radius: 99px;
    border-bottom-left-radius: 99px;
    background-color: ${colors.primary_outline};
    justify-content: center;
    padding-left: 7px;
  `;
  const PercentagePickIcon = styled.Image`
    position: absolute;
    bottom: 0px;
    left: ${((screenWidth - 147) * percentage) / 100 - 24}px;
    width: 48px;
    height: 48px;
  `;
  return (
    <MainStatContainer>
      <BarContainer>
        <BackBar>
          <Percentage>
            <PercentageText>{percentage}%</PercentageText>
          </Percentage>
          <PercentagePickIcon
            source={require("../../assets/Imgs/StatIcon.png")}
          />
        </BackBar>
      </BarContainer>
      <StatButton>
        <StatText>통계보기</StatText>
      </StatButton>
    </MainStatContainer>
  );
};

const MainStatContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const BarContainer = styled.View`
  width: ${screenWidth - 147};
`;
const BackBar = styled.View`
  flex-direction: row;
  height: 26px;
  border-radius: 99px;
  border: 1px solid ${colors.primary_outline};
`;
const PercentageText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  color: ${colors.grey_100};
`;
const StatButton = styled.View`
  width: 75px;
  height: 32px;
  padding: 0px 8px;
  margin-left: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.primary_container};
`;
const StatText = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  color: ${colors.primary};
`;
