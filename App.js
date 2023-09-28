import { NavigationContainer } from "@react-navigation/native";
import OnBoardingNav from "./navigators/OnBoardingNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <LoggedInNav />
        {/* <OnBoardingNav /> */}
      </NavigationContainer>
    </RecoilRoot>
  );
}
