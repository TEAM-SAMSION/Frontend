import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text } from '../../components/Fonts'
import { TouchableOpacity } from 'react-native'

export default function AdminHome({ navigation }) {
  return (
    <ScreenLayout color={colors.red_200}>
      <BodyBoldSm_Text>AdminHome</BodyBoldSm_Text>
      <TouchableOpacity onPress={() => navigation.navigate('ManagePetNav')}>
        <BodyBoldSm_Text>펫관리페이지</BodyBoldSm_Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ManageMember')}>
        <BodyBoldSm_Text>회원관리페이지</BodyBoldSm_Text>
      </TouchableOpacity>
    </ScreenLayout>
  )
}
