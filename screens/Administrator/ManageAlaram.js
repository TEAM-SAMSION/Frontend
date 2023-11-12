import styled from 'styled-components/native'
import { colors } from '../../colors'
import { HeaderWithBack, ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text } from '../../components/Fonts'

export default function ManageAlarm({ navigation }) {
  return (
    <ScreenLayout>
      <HeaderWithBack title="공지 등록" navigation={navigation} />
      <BodyBoldSm_Text>ManageAlarm</BodyBoldSm_Text>
    </ScreenLayout>
  )
}
