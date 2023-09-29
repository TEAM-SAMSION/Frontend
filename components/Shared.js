import styled from "styled-components/native";
import { Dimensions, StatusBar } from "react-native";

////////// safearea //////////
export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: white;
`;

export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;

export const ScreenLayout = ({ children }) => {
  return (
    <ScreenContainer>
      <StatusBar backgroundColor="#fff" />
      {children}
    </ScreenContainer>
  );
};

const Margin_16 = styled.View`
  margin: 0 16px;
  flex: 1;
`;
