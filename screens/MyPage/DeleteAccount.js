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
import { BodyBoldSm_Text, DetailSm_Text } from '../../components/Fonts'

export default function DeleteAccount({ route, navigation }) {
  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  const [userNickname, setUserNickname] = useState('')
  const [userPeriod, setUserPeriod] = useState(10)
  const [teamList, setTeamList] = useState([])
  const [todoNum, setTodoNum] = useState(0)
  const [todoList, setTodoList] = useState([])
  const [todoPage, setTodoPage] = useState(0)

  useEffect(() => {
    getUserInfo(ACCESSTOKEN).then((result) => {
      setUserNickname(result.nickname)
    })
    getAllTeams(ACCESSTOKEN).then((result) => {
      setTeamList(result)
    })
    getAllTodos(ACCESSTOKEN, todoPage).then((result) => {
      setTodoList(result)
      console.log(todoList)
    })
    getAllTodoNum(ACCESSTOKEN).then((result) => {
      setTodoNum(result)
    })
  }, [])

  const renderTeamItem = ({ item }) => (
    <TeamContainer>
      <TeamImage source={{ uri: `${item.teamProfileImage}` }} />
      <DetailSm_Text>{item.teamName}</DetailSm_Text>
    </TeamContainer>
  )

  const renderItem = ({ item }) => (
    <TodoContainer
      style={{
        shadowColor: 'rgb(0,0,0)',
        shadowRadius: 2,
        shadowOpacity: 0.2,
        shadowOffset: [0, 0],
      }}
    >
      <TodoImage source={{ uri: `${item.teamProfileImage}` }} />
      <ContentContainer>
        <DetailSm_Text>{item.categoryName}</DetailSm_Text>
        <BodyBoldSm_Text>{item.task}</BodyBoldSm_Text>
      </ContentContainer>
    </TodoContainer>
  )

  return (
    <ScrollView style={{ backgroundColor: colors.grey_100 }}>
      <Container>
        <TimeBox>
          <Title>
            <TeamNameText>포잇</TeamNameText>과 함께한 {userNickname}님의 시간
          </Title>
          <DateContent
            style={{
              shadowColor: 'rgb(0,0,0)',
              shadowRadius: 2,
              shadowOpacity: 0.2,
              shadowOffset: [0, 0],
            }}
          >
            <DateText>{userPeriod}일</DateText>
          </DateContent>
        </TimeBox>
        <TeamBox>
          <TitleBox>
            <Title>
              <TeamNameText>포잇</TeamNameText>과 함께한 {userNickname}님의 Pamily
            </Title>
          </TitleBox>
          <FlatList horizontal={true} data={teamList} renderItem={renderTeamItem} />
        </TeamBox>
        <TodoBox>
          <TitleBox>
            <Title>
              <TeamNameText>포잇</TeamNameText>과 함께한 {userNickname}님의 Todo, {todoNum}개
            </Title>
          </TitleBox>
          <FlatList data={todoList} renderItem={renderItem} />
        </TodoBox>
        <DeleteButton
          onPress={() => {
            navigation.navigate('DeleteAccount2')
          }}
        >
          <ButtonText>다음</ButtonText>
        </DeleteButton>
      </Container>
    </ScrollView>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 0px 16px;
  margin-bottom: 22px;
  background-color: ${colors.grey_100};
`
const TimeBox = styled.View`
  padding: 24px 0px;
  gap: 16px;
`
const Title = styled.Text`
  color: ${colors.grey_700};
  font-family: 'Spoqa-Bold';
  font-size: 16px;
  line-height: 22px;
`
const TeamNameText = styled.Text`
  color: ${colors.primary_outline};
  font-family: 'Spoqa-Bold';
  font-size: 16px;
  line-height: 22px;
`
const DateContent = styled.View`
  height: 56px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.grey_100};
`
const DateText = styled.Text`
  color: ${colors.secondary};
  font-family: 'Spoqa-Bold';
  font-size: 22px;
  line-height: 30px;
`
const TeamBox = styled.View`
  gap: 16px;
  margin-bottom: 24px;
`
const TodoBox = styled.View`
  gap: 16px;
  margin-bottom: 70px;
`
const TitleBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const TodoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  height: 77px;
  border-radius: 16px;
  margin: 2px 2px 16px 2px;
  background-color: ${colors.grey_100};
  gap: 12px;
`
const TeamImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 16px;
  background-color: ${colors.grey_150};
`
const TodoImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
`
const TeamContainer = styled.View`
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`
const ContentContainer = styled.View`
  gap: 4px;
  justify-content: center;
`
const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
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
