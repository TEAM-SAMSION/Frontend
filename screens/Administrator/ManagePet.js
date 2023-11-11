import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text } from '../../components/Fonts'

export default function ManagePet({ navigation }) {
  return (
    <ScreenLayout color={colors.red_200}>
      <BodyBoldSm_Text>ManagePet</BodyBoldSm_Text>
    </ScreenLayout>
  )
}
