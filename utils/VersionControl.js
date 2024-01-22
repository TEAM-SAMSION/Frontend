import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Alert, Linking, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const getLatestAppVersion = async () => {
  try {
    const response = await axios.get('https://itunes.apple.com/lookup?bundleId=com.khs110500.pawith&country=kr')
    return response.data.results[0].version
  } catch (error) {
    console.error('Error fetching latest app version:', error)
    return null
  }
}

const goToAppStore = () => {
  const storeUrl = Platform.select({
    // iOS 앱 스토어 URL
    ios: 'https://apps.apple.com/app/pawith/id6472612736?action=update',
    // android: `market://details?id=${appId}`,
  })
  console.log(storeUrl)
  Linking.openURL(storeUrl).catch((error) => {
    console.log('앱 스토어로 이동할 수 없습니다.', error)
  })
}

export const checkVersion = async () => {
  const currentVersion = DeviceInfo.getVersion()
  const latestVersion = await getLatestAppVersion()
  console.log(currentVersion, latestVersion)
  if (latestVersion && latestVersion > currentVersion) {
    console.log('버전 업데이트 필요')
    Alert.alert('업데이트 필요', '최신 버전을 사용해야 합니다. 앱 스토어로 이동하시겠습니까?', [
      // { text: '취소', style: 'cancel' },
      {
        text: '이동하기',
        onPress: () => {
          goToAppStore()
        },
      },
    ])
  } else {
    console.log('버전 최신 버전임')
  }
}
