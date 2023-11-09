import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text } from '../../components/Fonts'

export default function ManageTodo({ navigation }) {
  return (
    <ScreenLayout color={colors.red_200}>
      <BodyBoldSm_Text>ManageTodo</BodyBoldSm_Text>
    </ScreenLayout>
  )
}
