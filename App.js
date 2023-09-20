import { NavigationContainer } from "@react-navigation/native";
import OnBoardingNav from "./navigators/OnBoardingNav";
import LoggedInNav from "./navigators/LoggedInNav";

export default function App() {
  return (
    <NavigationContainer>
      <LoggedInNav />
      {/* <OnBoardingNav /> */}
    </NavigationContainer>
  );
}
