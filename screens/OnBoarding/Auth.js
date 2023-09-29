import React, { useState, useEffect } from "react";
import axios from "axios";

import { styled } from "styled-components/native";
import * as KakaoLogin from "@react-native-seoul/kakao-login";
import NaverLogin from "@react-native-seoul/naver-login";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  appleAuth,
  appleAuthAndroid,
  AppleButton,
} from "@invertase/react-native-apple-authentication";

WebBrowser.maybeCompleteAuthSession();

//Apple 소셜로그인 위해 언젠가는 사용해야할것
//let user = null;

export default function Auth({ navigation }) {
  const [successNaver, setSuccessRes] = useState();
  const [failureNaver, setFailureRes] = useState();
  const [getProfileRes, setGetProfileRes] = useState();

  const [GoogleReq, GoogleRes, GooglepromptAsync] = Google.useAuthRequest({
    expoClientId:
      "317985927887-jk1lb4tj27lvvb750v2pfs6ud7k1doaa.apps.googleusercontent.com",
    iosClientId:
      "317985927887-qm9cppbaanvfnehe3kd94hd93190r2cj.apps.googleusercontent.com",
    androidClientId:
      "317985927887-lk1mf2lb341hiu5kht8a4p1oeigg2f98.apps.googleusercontent.com",
    webClientId:
      "317985927887-jk1lb4tj27lvvb750v2pfs6ud7k1doaa.apps.googleusercontent.com",
  });

  const loginKakao = () => {
    KakaoLogin.login()
      .then((result) => {
        try {
          getTokenKakao(JSON.stringify(result.accessToken)).then((res) =>
            console.log("KakaoLogin API실행결과??:", res)
          );
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      })
      .catch((error) => {
        if (error.code === "E_CANCELLED_OPERATION") {
          console.log("Login Cancel", error.message);
        } else {
          console.log(`Login Fail(code:${error.code})`, error.message);
        }
      });
  };
  const getTokenKakao = async (accessToken) => {
    let url = "http://52.78.52.47:8080/";
    let detailAPI = `oauth/KAKAO?accessToken=${accessToken}`; //500
    //google에서 발급받는 동일한 AccessToken 집어 넣어도 + 같은 호출문 구조 사용해도 [AxiosError: Request failed with status code 500] 발생
    const response = await axios.get(url + detailAPI, {
      headers: {
        "Content-Type": `application/json`,
      },
    });
    const result = response.data;
    return result;
  };
  const loginGoogle = async (accessToken) => {
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

  const loginNaver = async () => {
    console.log("HELlo?");
    const { failureResponse, successResponse } = await NaverLogin.login({
      appName: "Pawith",
      consumerKey: "Oto4EWnaTmbyQFJIA6qP",
      consumerSecret: "8n99KCI4r9",
      serviceUrlScheme: "pawithnaverlogin",
    });
    try {
      getTokenNaver(successResponse.accessToken).then((res) =>
        console.log("NaverLogin API실행결과??:", res)
      );
      // setSuccessRes(successResponse);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const getTokenNaver = async (accessToken) => {
    let url = "http://52.78.52.47:8080/";
    let detailAPI = `oauth/NAVER?accessToken=${accessToken}`; //500
    //google에서 발급받는 동일한 AccessToken 집어 넣어도 + 같은 호출문 구조 사용해도 [AxiosError: Request failed with status code 500] 발생
    const response = await axios.get(url + detailAPI, {
      headers: {
        "Content-Type": `application/json`,
      },
    });
    const result = response.data;
    return result;
  };
  const getTokenApple = async (accessToken) => {
    let url = "http://52.78.52.47:8080/";
    let detailAPI = `oauth/APPLE?accessToken=${accessToken}`; //500
    const response = await axios.get(url + detailAPI, {
      headers: {
        "Content-Type": `application/json`,
      },
    });
    const result = response.data;
    return result;
  };
  const logoutNaver = async () => {
    console.log("Naver Logout");
    try {
      await NaverLogin.logout();
      setSuccessRes(undefined);
      setFailureRes(undefined);
      setGetProfileRes(undefined);
    } catch (e) {
      console.error(e);
    }
  };
  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // console.log("appleAuthRequestResponse", appleAuthRequestResponse);
    const {
      user: newUser,
      email,
      nonce,
      identityToken,
      realUserStatus /* etc */,
    } = appleAuthRequestResponse;
    try {
      getTokenApple(identityToken).then((res) =>
        console.log("AppleLogin API실행결과??:", res)
      );
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    if (!appleAuth.isSupported) return;
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        "If this function executes, User Credentials have been Revoked"
      );
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  useEffect(() => {
    if (GoogleRes) {
      if (GoogleRes?.type === "success") {
        loginGoogle(GoogleRes.authentication.accessToken).then((result) =>
          console.log("GoogleLogin API실행결과:", result)
        );
      }
    }
  }, [GoogleRes]);
  return (
    <Container>
      <SymbolContainer>
        <SymbolIcon />
      </SymbolContainer>
      <Button onPress={() => GooglepromptAsync()}>
        <ButtonText>Google로 시작하기</ButtonText>
      </Button>
      <Button onPress={() => loginNaver()}>
        <ButtonText>Naver로 시작하기</ButtonText>
      </Button>
      <Button onPress={() => loginKakao()}>
        <ButtonText>Kakao로 시작하기</ButtonText>
      </Button>
      <Button onPress={() => logoutNaver()}>
        <ButtonText>Naver 로그아웃</ButtonText>
      </Button>
      {appleAuth.isSupported && (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160, // You must specify a width
            height: 45, // You must specify a height
          }}
          onPress={() => onAppleButtonPress()}
        />
      )}
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
