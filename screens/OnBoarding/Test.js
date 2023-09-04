import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export const Test = () => {
  const getAccessToken = async (accessToken) => {
    console.log("accessToken:", accessToken); //변수들 잘 불러옴 string, string
    try {
      let url = "http://52.78.52.47:8080/";
      let detailAPI = `oauth/GOOGLE?accessToken=${accessToken}`; //500
      const response = await axios.get(url + detailAPI, {
        headers: {
          "Content-Type": `application/json`,
        },
      });
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "317985927887-jk1lb4tj27lvvb750v2pfs6ud7k1doaa.apps.googleusercontent.com",
    iosClientId:
      "317985927887-qm9cppbaanvfnehe3kd94hd93190r2cj.apps.googleusercontent.com",
    androidClientId:
      "317985927887-lk1mf2lb341hiu5kht8a4p1oeigg2f98.apps.googleusercontent.com",
    webClientId:
      "317985927887-jk1lb4tj27lvvb750v2pfs6ud7k1doaa.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response) {
      if (response?.type === "success") {
        getAccessToken(response.authentication.accessToken).then((result) =>
          console.log("result:", result)
        );
      }
    }
  }, [response]);

  return (
    <View
      style={{
        backgroundColor: "chartreuse",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{ width: 100, height: 64, backgroundColor: "white" }}
        onPress={() => promptAsync()}
      >
        <Text> Login </Text>
      </TouchableOpacity>
    </View>
  );
};
