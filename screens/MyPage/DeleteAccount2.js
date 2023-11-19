import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { getAllTeams, getAllTodoNum, getAllTodos, getUserInfo } from '../../components/MyPage/Apis'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { useIsFocused } from '@react-navigation/native'
import { TabBarAtom } from '../../recoil/TabAtom'
import { ScrollView } from 'react-native-gesture-handler'
import { BodyBoldSm_Text, DetailSm_Text, SubHead_Text } from '../../components/Fonts'
import { ScreenLayout } from '../../components/Shared'
import { DeleteReasonToggle } from '../../components/MyPage/DeleteReasonToggle'

export default function DeleteAccount2({ route, navigation }) {
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const [reason, setReason] = useState('')

  return (
    <ScreenLayout>
      <Container>
        <TitleBox>
          <SubHead_Text>정말 포잇을 그만하시겠습니까?</SubHead_Text>
          <OneLine>
            <SubHead_Text color={colors.primary}>탈퇴이유</SubHead_Text>
            <SubHead_Text>를 알려주세요.</SubHead_Text>
          </OneLine>
        </TitleBox>
        <DeleteReasonToggle setReason={setReason} />
      </Container>
      <DeleteButton
        onPress={() => {
          navigation.navigate('DeleteAccount3')
        }}
      >
        <ButtonText>다음</ButtonText>
      </DeleteButton>
    </ScreenLayout>
  )
}

const Container = styled.View`
  margin: 16px;
`
const TitleBox = styled.View`
  margin-bottom: 16px;
`
const OneLine = styled.View`
  flex-direction: row;
`
const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 34px;
  left: 16px;
  right: 16px;
  background-color: ${colors.red_200};
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`
const ButtonText = styled.Text`
  color: ${colors.red_350};
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
`