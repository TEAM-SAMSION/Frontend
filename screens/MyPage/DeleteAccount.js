import { useEffect, useState } from 'react'
import { FlatList, Platform } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { countDate, getAllTeams, getAllTodoNum, getAllTodos, getUserInfo } from '../../components/MyPage/Apis'
import { BodyBoldSm_Text, DetailSm_Text } from '../../components/Fonts'
import { ScreenLayout } from '../../components/Shared'

export default function DeleteAccount({ route, navigation }) {
  const [userNickname, setUserNickname] = useState('')
  const [userPeriod, setUserPeriod] = useState()
  const [teamList, setTeamList] = useState([])
  const [todoNum, setTodoNum] = useState(0)
  const [todoList, setTodoList] = useState([])
  const [todoPage, setTodoPage] = useState(0)

  useEffect(() => {
    getUserInfo().then((result) => {
      setUserNickname(result.nickname)
    })
    getAllTeams().then((result) => {
      setTeamList(result)
    })
    getAllTodos(todoPage).then((result) => {
      setTodoList(result)
      console.log(todoList)
    })
    getAllTodoNum().then((result) => {
      setTodoNum(result)
    })
    countDate().then((result) => {
      setUserPeriod(result)
    })
  }, [])

  const loadMore = async () => {
    const newTodoList = await getAllTodos(todoPage + 1)
    setTodoList((prevTodoList) => [...prevTodoList, ...newTodoList])
    setTodoPage((prevTodoPage) => prevTodoPage + 1)
  }

  const renderTeamItem = ({ item }) => (
    <TeamContainer>
      <TeamImage source={{ uri: `${item.teamProfileImage}` }} />
      <TeamText numberOfLines={1} ellipsizeMode="tail">
        {item.teamName}
      </TeamText>
    </TeamContainer>
  )

  const renderItem = ({ item }) => (
    <TodoContainer
      style={
        Platform.OS == 'android'
          ? { elevation: 0.7, borderWidth: 0.7, borderColor: 'rgba(0, 0, 0, 0.01)' }
          : {
              shadowColor: 'rgb(0,0,0)',
              shadowRadius: 2,
              shadowOpacity: 0.2,
              shadowOffset: [0, 0],
            }
      }
    >
      <TodoImage source={{ uri: `${item.teamProfileImage}` }} />
      <ContentContainer>
        <DetailSm_Text>{item.categoryName}</DetailSm_Text>
        <BodyBoldSm_Text>{item.task}</BodyBoldSm_Text>
      </ContentContainer>
    </TodoContainer>
  )

  return (
    <ScreenLayout>
      <Container>
        <TimeBox>
          <Title>
            <TeamNameText>포잇</TeamNameText>과 함께한 {userNickname}님의 시간
          </Title>
          <DateContent
            style={
              Platform.OS == 'android'
                ? { elevation: 0.7, borderWidth: 0.7, borderColor: 'rgba(0, 0, 0, 0.01)' }
                : {
                    shadowColor: 'rgb(0,0,0)',
                    shadowRadius: 2,
                    shadowOpacity: 0.2,
                    shadowOffset: [0, 0],
                  }
            }
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
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={teamList}
            renderItem={renderTeamItem}
          />
        </TeamBox>
        <TodoBox>
          <TitleBox>
            <Title>
              <TeamNameText>포잇</TeamNameText>과 함께한 {userNickname}님의 Todo, {todoNum}개
            </Title>
          </TitleBox>
          <Todos>
            <FlatList
              data={todoList}
              renderItem={renderItem}
              onEndReached={loadMore}
              onEndReachedThreshold={1}
              showsVerticalScrollIndicator={false}
            />
          </Todos>
        </TodoBox>
        <DeleteButton
          style={Platform.OS == 'android' ? { bottom: 16 } : { bottom: 0 }}
          onPress={() => {
            navigation.navigate('DeleteAccount2')
          }}
        >
          <ButtonText>다음</ButtonText>
        </DeleteButton>
      </Container>
    </ScreenLayout>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 0px 16px;
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
const TeamText = styled.Text`
  font-family: 'Spoqa-Regular';
  font-size: 12px;
  line-height: 15px;
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
  width: 70px;
`
const ContentContainer = styled.View`
  gap: 4px;
  justify-content: center;
`
const DeleteButton = styled.TouchableOpacity`
  position: absolute;
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
const Todos = styled.View`
  height: 320px;
`
