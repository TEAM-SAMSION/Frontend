import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { colors } from '../../colors'
import { ScreenLayout, url } from '../../components/Shared'
import styled from 'styled-components/native'
import SearchIcon from '../../assets/Svgs/Search.svg'
import { TeamSearchBox } from '../../components/Home/TeamSearchBox'
import { getSearchedTeam } from '../../components/Home/Apis'
import { useRecoilState } from 'recoil'
import { TabBarAtom } from '../../recoil/TabAtom'
import { useIsFocused } from '@react-navigation/native'
import { SubHeadSm_Text } from '../../components/Fonts'

export default function JoinTeam({ navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)
  const [pamilyCode, setPamilyCode] = useState('')
  const [searchedData, setSearchedData] = useState([])
  const [isNonResult, setIsNonResult] = useState(false)

  // onFocus
  const [onName, setOnName] = useState(false)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  const searchTeam = async (teamCode) => {
    try {
      await getSearchedTeam(teamCode).then((result) => {
        {
          result.length !== 0 && setIsNonResult(false) & setSearchedData(result)
        }
      })
    } catch (error) {
      setIsNonResult(true) & setSearchedData([])
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Block style={{ borderWidth: onName ? 1 : 0, borderColor: onName ? 'rgba(0, 0, 0, 0.12)' : '' }}>
          <InputBlock
            editable
            onChangeText={(text) => setPamilyCode(text)}
            placeholder="Pamily 코드를 입력해주세요"
            placeholderTextColor={colors.grey_400}
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            returnKeyType="done"
            onSubmitEditing={() => searchTeam(pamilyCode)}
            onFocus={() => setOnName(true)}
            onBlur={() => setOnName(false)}
          />
          <IconBox onPress={() => searchTeam(pamilyCode)}>
            <SearchIcon width={16} height={16} />
          </IconBox>
        </Block>
        {searchedData.length !== 0 && <TeamSearchBox data={searchedData} />}
        {isNonResult ? (
          <NoneBox>
            <SubHeadSm_Text color={colors.grey_400}>검색 결과가 없습니다</SubHeadSm_Text>
          </NoneBox>
        ) : (
          ''
        )}
      </Container>
    </TouchableWithoutFeedback>
  )
}

const Container = styled.View`
  flex: 1;
  padding-top: 16px;
  background-color: ${colors.grey_100};
`
const InputBlock = styled.TextInput`
  width: 85%;
  padding-left: 16px;
  font-family: 'Spoqa-Medium';
  color: ${colors.grey_600};
  height: 42px;
  font-size: 14px;
  line-height: 19px;
`
const Block = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px 16px 16px;
  height: 44px;
  padding-right: 16px;
  border-radius: 12px;
  background-color: ${colors.grey_150};
`
const IconBox = styled.TouchableOpacity``
const NoneBox = styled.View`
  margin-top: 234px;
  justify-content: center;
  align-items: center;
`
