import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import SearchIcon from '../../assets/Svgs/Search.svg'
import { TeamSearchBox } from '../../components/Home/TeamSearchBox'
export default function JoinTeam({ navigation }) {
  const [pamilyCode, setPamilyCode] = useState('')
  return (
    <ScreenLayout color={colors.grey_150}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <Container>
          <Block>
            <InputBlock
              editable
              onChangeText={(text) => setPamilyCode(text)}
              placeholder="모임 코드 번호를 입력해주세요."
              placeholderTextColor={colors.grey_400}
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              returnKeyType="done"
              ref={(input) => {
                this.secondInput = input
              }}
            />
            <IconBox>
              <SearchIcon width={16} height={16} />
            </IconBox>
          </Block>
          <TeamSearchBox />
        </Container>
      </TouchableWithoutFeedback>
    </ScreenLayout>
  )
}

const Container = styled.View`
  background-color: ${colors.grey_150};
  padding-top: 16px;
  height: 1000px;
`
const InputBlock = styled.TextInput`
  font-family: 'Spoqa-Medium';
  background-color: ${colors.grey_100};
  color: ${colors.grey_600};
  height: 44px;
  font-size: 14px;
  line-height: 19px;
`
const Block = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 16px;
  height: 44px;
  padding: 0px 16px;
  border-radius: 8px;
  background-color: ${colors.grey_100};
`
const IconBox = styled.TouchableOpacity``
