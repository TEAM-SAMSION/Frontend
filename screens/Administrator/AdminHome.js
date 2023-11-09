import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text } from '../../components/Fonts'

export default function AdminHome({ navigation }) {
  return (
    <ScreenLayout color={colors.red_200}>
      <BodyBoldSm_Text>AdminHome</BodyBoldSm_Text>
    </ScreenLayout>
  )
}
