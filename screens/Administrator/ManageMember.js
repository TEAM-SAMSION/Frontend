import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { BodySm_Text, Detail_Text } from '../../components/Fonts'
import SearchIcon from '../../assets/Svgs/Search.svg'
import Clipboard from '@react-native-clipboard/clipboard'
import { useState } from 'react'
import { MemberSearchBox } from '../../components/Administrator/MemberSearchBox'

export default function ManageMember({ navigation }) {
  const pamilyCode = 'dododo'
  const [searchedName, setSearchedName] = useState('')
  const [searchedData, setSearchedData] = useState([
    {
      registerId: -9223372036854775808,
      authority: 'PRESIDENT',
      registerName: '신민선',
      registerEmail: 'tlsalstjs@gmail.com',
    },
    {
      registerId: -7852,
      authority: 'EXECUTIVE',
      registerName: '황주희',
      registerEmail: 'ghkdwngml@gmail.com',
    },
    {
      registerId: -933,
      authority: 'MEMBER',
      registerName: '회원1',
      registerEmail: 'vptahfl@gmail.com',
    },
  ])

  const copyTeamCode = () => {
    Clipboard.setString(pamilyCode)
  }

  return (
    <ScreenLayout>
      <Container>
        <InputBox>
          <CodeBox>
            <BodySm_Text color={colors.grey_800}>Pamily 코드</BodySm_Text>
            <BodySm_Text style={{ color: colors.grey_400 }}>{pamilyCode}</BodySm_Text>
          </CodeBox>
          <CodeButton onPress={copyTeamCode}>
            <Detail_Text color={colors.secondary}>복사</Detail_Text>
          </CodeButton>
        </InputBox>
        <Block>
          <InputBlock
            editable
            onChangeText={(text) => setSearchedName(text)}
            placeholder="이름을 검색해주세요."
            placeholderTextColor={colors.grey_400}
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            returnKeyType="done"
            // onSubmitEditing={() => searchTeam(pamilyCode)}
          />
          <IconBox>
            <SearchIcon width={16} height={16} />
          </IconBox>
        </Block>
        <MemberSearchBox data={searchedData[0]} />
      </Container>
    </ScreenLayout>
  )
}

const Container = styled.View`
  gap: 16px;
  margin: 16px;
`
const InputBox = styled.View`
  flex-direction: row;
  background-color: ${colors.grey_150};
  padding: 0px 16px;
  height: 44px;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
`
const CodeButton = styled.TouchableOpacity`
  background-color: ${colors.grey_100};
  padding: 6px 8px;
  border-radius: 4px;
`
const CodeBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const InputBlock = styled.TextInput`
  font-family: 'Spoqa-Medium';
  background-color: ${colors.grey_150};
  color: ${colors.grey_600};
  height: 44px;
  font-size: 14px;
  line-height: 19px;
`
const Block = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 0px 16px;
  border-radius: 12px;
  background-color: ${colors.grey_150};
`
const IconBox = styled.TouchableOpacity``
