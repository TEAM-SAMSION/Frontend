import React, { useEffect } from 'react'
import axios from 'axios'
import { styled } from 'styled-components/native'
import * as KakaoLogin from '@react-native-seoul/kakao-login'
import NaverLogin from '@react-native-seoul/naver-login'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication'
import LoginButton from '../../components/OnBoarding/LoginButton'
import { colors } from '../../colors'
import { useSetRecoilState } from 'recoil'
import { loggedInState, platformState } from '../../recoil/AuthAtom'
import { url } from '../../components/Shared'
import AsyncStorage from '@react-native-async-storage/async-storage'

WebBrowser.maybeCompleteAuthSession()

export default function Auth({ navigation }) {
  const [GoogleReq, GoogleRes, GooglepromptAsync] = Google.useAuthRequest({
    expoClientId: '317985927887-jk1lb4tj27lvvb750v2pfs6ud7k1doaa.apps.googleusercontent.com',
    iosClientId: '317985927887-qm9cppbaanvfnehe3kd94hd93190r2cj.apps.googleusercontent.com',
    androidClientId: '317985927887-lk1mf2lb341hiu5kht8a4p1oeigg2f98.apps.googleusercontent.com',
    webClientId: '317985927887-jk1lb4tj27lvvb750v2pfs6ud7k1doaa.apps.googleusercontent.com',
  })
  const setLoggedIn = useSetRecoilState(loggedInState)
  const setPlatform = useSetRecoilState(platformState)
  const finishLogin = (accessToken, refreshToken, provider) => {
    //토큰 저장
    console.log('refreshToken:', refreshToken)
    console.log('토큰 값들 recoil에 갱신됨')

    //권한확인 API 통해서 닉네임 변경 거치는지 or 홈화면 바로 가는지
    checkAuthority(accessToken).then(async (res) => {
      console.log(res)
      if (res.authority == 'USER') {
        //향후 앱을 껐다가 켜도 유효한 사용자가 앱을 접속하는 것이기 때문에, 캐시에 토큰 저장
        await AsyncStorage.setItem('accessToken', accessToken)
        await AsyncStorage.setItem('refreshToken', refreshToken)
        console.log('권한 User라서 홈화면으로 넘어감 , AsyncStorage에 토큰 저장')
        setPlatform(provider)
        console.log('로그인 수단 Recoil에 저장하였음:', provider)
        setLoggedIn(true)
      } else if (res.authority == 'GUEST') {
        //닉네임 설정전까지는 앱 내부로 들여오게 해서는 안되기 때문에, 캐시에 저장아직 안함
        console.log('권한 Guest라서 닉네임설정으로 넘어감')
        navigation.navigate('UserSetting', { accessToken, refreshToken, provider })
      } else {
        console.log('유저 권한 확인단계에서 예외발생:', res)
      }
    })
    // .then(logoutNaver())
  }

  const checkAuthority = async (accessToken) => {
    let API = '/user/authority'
    const response = await axios.get(url + API, {
      headers: {
        Authorization: accessToken,
        'Content-Type': `application/json; charset=UTF-8`,
      },
    })
    return response.data
  }

  const loginKakao = () => {
    KakaoLogin.login()
      .then((result) => {
        try {
          getToken(JSON.stringify(result.accessToken), 'KAKAO')
        } catch (error) {
          console.error('Failed to fetch data:', error)
        }
      })
      .catch((error) => {
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log('Login Cancel', error.message)
        } else {
          console.log(`Login Fail(code:${error.code})`, error.message)
        }
      })
  }
  const loginNaver = async () => {
    const { failureResponse, successResponse } = NaverLogin.login({
      appName: 'Pawith',
      consumerKey: 'Oto4EWnaTmbyQFJIA6qP',
      consumerSecret: '8n99KCI4r9',
      serviceUrlScheme: 'pawithnaverlogin',
    })
    console.log(failureResponse, successResponse)
    try {
      getToken(successResponse.accessToken, 'NAVER')
    } catch (error) {
      console.error('Failed to fetch data-Naver:', error)
    }
    // })
  }
  const loginApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })
    const { user: newUser, email, nonce, identityToken, realUserStatus /* etc */ } = appleAuthRequestResponse
    try {
      getToken(identityToken, 'APPLE')
    } catch (error) {
      console.error('Failed to fetch data-Apple:', error)
    }
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }

  const getToken = async (accessToken, provider) => {
    let API = `/oauth/${provider}?accessToken=${accessToken}` //500
    try {
      const response = await axios.get(url + API, {
        headers: {
          Authorization: accessToken,
          'Content-Type': `application/json; charset=UTF-8`,
        },
      })
      finishLogin(response.data.accessToken, response.data.refreshToken, provider)
    } catch (e) {
      console.log('Failed To get Token:,', e)
    }
  }

  useEffect(() => {
    if (!appleAuth.isSupported) return
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked')
    })

    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
  }, []) // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  useEffect(() => {
    if (GoogleRes) {
      if (GoogleRes?.type === 'success') {
        getToken(GoogleRes.authentication.accessToken, 'GOOGLE')
      }
    }
  }, [GoogleRes])

  return (
    <Container>
      <SymbolContainer>
        <SymbolIcon source={require('../../assets/Imgs/LOGO_Symbol.png')} />
      </SymbolContainer>
      <LoginButton loginFunc={() => GooglepromptAsync()} id={0} />
      <LoginButton loginFunc={() => loginKakao()} id={1} />
      <LoginButton loginFunc={() => loginNaver()} id={2} />
      {appleAuth.isSupported && (
        <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: '100%',
            height: 44,
          }}
          onPress={() => loginApple()}
        />
      )}
    </Container>
  )
}

const Container = styled.View`
  padding: 0px 16px;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.grey_100};
  align-items: center;
`
const SymbolContainer = styled.View`
  margin-bottom: 90px;
  margin-top: 76px;
  justify-content: center;
  align-items: center;
`
const SymbolIcon = styled.Image`
  margin-top: 75px;
  width: 168px;
  height: 168px;
`
