import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import PlusIcon from '../../assets/Svgs/miniPlus.svg'

export default function CreateTeam({ navigation }) {
  const [enabled, setEnabled] = useState(false)
  const [pamilyName, setPamilyName] = useState('')
  const [pamilyCode, setPamilyCode] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            navigation.navigate('Home')
          }}
          style={{ marginRight: 24 }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 22,
              color: enabled ? colors.primary : colors.grey_450,
            }}
          >
            완료
          </Text>
        </TouchableOpacity>
      ),
    })
  }, [enabled])

  return (
    <ScreenLayout color={colors.grey_150}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <Container>
          <InputBlock
            editable
            onChangeText={(text) => setPamilyName(text)}
            autoFocus
            placeholder="Pamily 이름 입력"
            placeholderTextColor={colors.grey_400}
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            returnKeyType="done"
            ref={(input) => {
              this.firstInput = input
            }}
          />
          <Bar />
          <InputBlock
            editable
            onChangeText={(text) => setPamilyCode(text)}
            placeholder="Pamily 코드"
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
          <Block>
            <BlockText>Pamily 프로필/대표사진</BlockText>
            <PlusIcon width={16} height={16} />
          </Block>
          <Block>
            <BlockText>펫 프로필</BlockText>
            <PlusIcon width={16} height={16} />
          </Block>
        </Container>
      </TouchableWithoutFeedback>
    </ScreenLayout>
  )
}

const Container = styled.View`
  background-color: ${colors.grey_150};
  padding-top: 16px;
  height: 1000px;
  align-items: center;
`
const Bar = styled.View`
  width: 343px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.12);
`
const InputBlock = styled.TextInput`
  background-color: ${colors.grey_100};
  color: ${colors.grey_600};
  padding: 0px 16px;
  margin: 0px 16px;
  width: 343px;
  height: 44px;
  border-radius: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
`
const Block = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 343px;
  height: 44px;
  padding: 0px 16px;
  border-radius: 8px;
  background-color: ${colors.grey_100};
  margin-top: 16px;
`
const BlockText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
`
