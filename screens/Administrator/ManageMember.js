import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { BodySm_Text, Detail_Text } from '../../components/Fonts'
import SearchIcon from '../../assets/Svgs/Search.svg'
import Clipboard from '@react-native-clipboard/clipboard'
import { useEffect, useState } from 'react'
import { MemberSearchBox } from '../../components/Administrator/MemberSearchBox'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { getMember, searchMember } from '../../components/Administrator/Apis'
import { ScrollView } from 'react-native'

export default function ManageMember({ route, navigation }) {
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const data = route.params
  const teamId = data.teamId
  const pamilyCode = data.teamCode
  const [searchedName, setSearchedName] = useState('')
  const [allMember, setAllMember] = useState([])
  const [memberData, setMemberData] = useState([])

  // onFocus
  const [onName, setOnName] = useState(false)

  useEffect(() => {
    getMember(ACCESSTOKEN, teamId).then((result) => {
      setMemberData(result)
      setAllMember(result)
    })
  }, [])

  useEffect(() => {
    if (searchedName == '') {
      setMemberData(allMember)
    }
    searchMember(ACCESSTOKEN, teamId, searchedName).then((result) => {
      if (result.length > 0) {
        setMemberData(result)
      }
    })
  }, [searchedName])

  const reloadMember = () => {
    getMember(ACCESSTOKEN, teamId).then((result) => {
      setMemberData(result)
      setAllMember(result)
    })
  }

  const copyText = `초대코드: ${pamilyCode}${'\n'}참여방법: 포잇 > Pamily 참여하기 > 코드 입력`
  const copyTeamCode = () => {
    Clipboard.setString(copyText)
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
        <Block style={{ borderWidth: onName ? 1 : 0, borderColor: onName ? 'rgba(0, 0, 0, 0.12)' : '' }}>
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
            onFocus={() => setOnName(true)}
            onBlur={() => setOnName(false)}
          />
          <IconBox>
            <SearchIcon width={16} height={16} />
          </IconBox>
        </Block>
        {memberData.length > 5 ? (
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 100 }}>
            <MemberBox>
              {memberData.map((item, index) => (
                <MemberSearchBox
                  key={index}
                  data={item}
                  accessToken={ACCESSTOKEN}
                  teamId={teamId}
                  myAuthority={data.myAuthority}
                  changeFunction={() => reloadMember()}
                />
              ))}
            </MemberBox>
          </ScrollView>
        ) : (
          <MemberBox>
            {memberData.map((item, index) => (
              <MemberSearchBox
                key={index}
                data={item}
                accessToken={ACCESSTOKEN}
                teamId={teamId}
                myAuthority={data.myAuthority}
                changeFunction={() => reloadMember()}
              />
            ))}
          </MemberBox>
        )}
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
  height: 42px;
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
const MemberBox = styled.View``
