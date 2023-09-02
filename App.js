import { NavigationContainer } from "@react-navigation/native";
import OnBoardingNav from "./navigators/OnBoardingNav";

export default function App() {
  return (
    <NavigationContainer>
      <OnBoardingNav />
    </NavigationContainer>
  );
}
