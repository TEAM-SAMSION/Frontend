import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./navigators/AuthNav";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNav />
    </NavigationContainer>
  );
}
