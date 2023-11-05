import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import SearchIcon from '../../assets/Svgs/Search.svg'
import { TeamSearchBox } from '../../components/Home/TeamSearchBox'
import { getSearchedTeam } from '../../components/Home/Apis'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
export default function JoinTeam({ navigation }) {
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const [pamilyCode, setPamilyCode] = useState('')
  const [searchedData, setSearchedData] = useState([])

  const searchTeam = (teamCode) => {
    getSearchedTeam(ACCESSTOKEN, teamCode).then((result) => {
      {
        result.length !== 0 && setSearchedData(result)
      }
      console.log(result)
      // result 없을 경우 -> alert 창 뜨게 해야 함
      // 검색 에러 코드 받아오기
    })
  }

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
              onSubmitEditing={() => searchTeam(pamilyCode)}
            />
            <IconBox onPress={() => searchTeam(pamilyCode)}>
              <SearchIcon width={16} height={16} />
            </IconBox>
          </Block>
          {searchedData.length !== 0 && <TeamSearchBox data={searchedData} />}
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
