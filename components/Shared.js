import styled from "styled-components/native";
import { StatusBar } from "react-native";

////////// safearea //////////
export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`;

export const ScreenLayout = ({ children }) => {
  return (
    <ScreenContainer style={{ backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" />
      {children}
    </ScreenContainer>
  );
};

////////// custom navigation header //////////
