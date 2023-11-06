import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, View } from 'react-native'
import { ScreenLayout } from '../../components/Shared'
import { TopHeader } from '../../components/Home/TopHeader'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import Plus from '../../assets/Svgs/plus.svg'
import Go from '../../assets/Svgs/go.svg'
import axios from 'axios'
import { MainStat } from '../../components/Home/MainStat'
import { PamilyChoiceToggle } from '../../components/Home/PamilyChoiceToggle'
import { MainImage } from '../../components/Home/MainImage'
import { TodoBox } from '../../components/Home/TodoBox'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { getMyTodoList, getTeamList, getTodoProgress, getUserInfo } from '../../components/Home/Apis'
import { AccessTokenRequest } from 'expo-auth-session'
import { useIsFocused } from '@react-navigation/native'
import { BodySm_Text, DetailSm_Text } from '../../components/Fonts'

export default function Home({ navigation }) {
  const isFocused = useIsFocused()
  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  const [name, setName] = useState('포잇')
  const [now, setNow] = useState(new Date(Date.now() + 9 * 60 * 60 * 1000))
  const date = parseInt(now.toISOString().substring(8, 10))
  const month = now.getMonth() + 1
  const [pamilyList, setPamilyList] = useState([])
  const [progress, setProgress] = useState(0)
  const [pamilyNum, setPamilyNum] = useState(0)

  const getUserNickname = () => {
    getUserInfo(ACCESSTOKEN).then((result) => {
      setName(result.nickname)
    })
  }

  useEffect(() => {
    getUserNickname()
  }, [])

  const fetchTeamList = () => {
    getTeamList(ACCESSTOKEN).then((result) => {
      setPamilyList(result)
      //console.log(result)
      if (result.length !== 0) {
        setPamilyNum(1)
      }
    })
  }

  const fetchProgress = () => {
    const topTeamId = pamilyList[0].teamId
    getTodoProgress(ACCESSTOKEN, topTeamId).then((result) => {
      setProgress(result)
    })
  }

  useEffect(() => {
    fetchTeamList()
    {
      pamilyNum !== 0 && fetchMyTodo()
    }
  }, [isFocused])

  const [myTodo, setMyTodo] = useState([])
  const [todoPage, setTodoPage] = useState(0)

  const fetchMyTodo = async () => {
    const allTodos = []
    for (const team of pamilyList) {
      const teamId = team.teamId
      try {
        const todos = await getMyTodoList(ACCESSTOKEN, todoPage, teamId)
        allTodos.push(
          ...todos.map((todo) => ({
            teamName: team.teamName,
            todoId: todo.todoId,
            task: todo.task,
            status: todo.status,
          })),
        )
      } catch (error) {
        console.error('Error fetching todo list')
      }
    }
    setMyTodo(allTodos)
  }

  useEffect(() => {
    fetchMyTodo()
  }, [pamilyList, todoPage])

  const testTodo = [
    {
      teamName: '펫모리',
      todoId: 319,
      task: 'tatpehb',
      status: 'COMPLETE',
    },
    {
      teamName: '펫모리2',
      todoId: 310,
      task: 'tatpeh2023',
      status: 'INCOMPLETE',
    },
    {
      teamName: '펫모리3',
      todoId: 3111,
      task: 'tatpeh2023',
      status: 'INCOMPLETE',
    },
    {
      teamName: '펫모리4',
      todoId: 3102,
      task: 'tatpeh2023',
      status: 'INCOMPLETE',
    },
  ]
  return (
    <ScreenLayout>
      <ScrollView>
        <TopHeader navigation={navigation} />
        <BannerContainer>
          <NickBox>
            <NicknameContainer>
              <NickText>{name} </NickText>
              <NickSubText>님,</NickSubText>
            </NicknameContainer>
            <SubText>오늘도 포잇과 함께 마이펫을 관리해볼까요?</SubText>
          </NickBox>
          <PamilyContainer>
            <PamilyChoiceToggle pamilyList={pamilyList} />
            <MainImage progress={progress} pamilyNum={pamilyNum} />
            <PamilyStatContainer>
              {pamilyNum == 0 ? <NoneText>소속된 Pamily가 없습니다.</NoneText> : <MainStat progress={progress} />}
            </PamilyStatContainer>
          </PamilyContainer>
        </BannerContainer>
        {pamilyNum == 0 ? (
          <TeamContainer>
            <StartTeamContainer
              style={{
                shadowColor: 'rgb(0,0,0)',
                shadowRadius: 2,
                shadowOpacity: 0.15,
                shadowOffset: [0, 0],
              }}
              onPress={() => {
                navigation.navigate('CreateTeam')
              }}
            >
              <Title>Pamily 생성하기</Title>
              <SubTitle>
                TODO를 함께할{'\n'}
                Pamily를 생성해 볼까요?
              </SubTitle>
              <StartIcon>
                <Plus />
              </StartIcon>
            </StartTeamContainer>
            <StartTeamContainer
              style={{
                shadowColor: 'rgb(0,0,0)',
                shadowRadius: 2,
                shadowOpacity: 0.15,
                shadowOffset: [0, 0],
              }}
              onPress={() => {
                navigation.navigate('JoinTeam')
              }}
            >
              <Title>Pamily 참여하기</Title>
              <SubTitle>TODO를 함께할{'\n'}Pamily에 참여해 볼까요?</SubTitle>
              <StartIcon>
                <Go />
              </StartIcon>
            </StartTeamContainer>
          </TeamContainer>
        ) : (
          <>
            <TodoTitle>
              <TitleText>
                {month}월 {date}일, 나에게 할당된 TODO
              </TitleText>
            </TodoTitle>
            <TodoContainer>
              {myTodo.length == 0 ? (
                <NoneTodoContainer>
                  <BodySm_Text color={colors.grey_600}>아직 나에게 할당된 TODO가 없어요!</BodySm_Text>
                  <DetailSm_Text color={colors.grey_400}>관리자에게 TODO를 요청해보세요.</DetailSm_Text>
                </NoneTodoContainer>
              ) : (
                <FlatList
                  data={myTodo}
                  renderItem={({ item, index }) => {
                    return <TodoBox data={item} index={index} />
                  }}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                />
              )}
            </TodoContainer>
            <AllTodoButton onPress={() => navigation.navigate('ToDoNav')}>
              <ButtonText>전체 TODO 확인하기</ButtonText>
            </AllTodoButton>
          </>
        )}
      </ScrollView>
    </ScreenLayout>
  )
}

const BannerContainer = styled.View`
  height: 398px;
  padding: 24px 16px;
  background-color: #ffe2e0;
`
const NicknameContainer = styled.View`
  flex-direction: row;
`
const NickBox = styled.View`
  padding-left: 8px;
`
const NickText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 22px;
  line-height: 30px;
  color: #fd8d81;
`
const NickSubText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 22px;
  line-height: 30px;
`
const SubText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 16px;
  line-height: 22px;
  color: ${colors.grey_600};
`
const PamilyContainer = styled.View`
  height: 274px;
  border-radius: 16px;
  border: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 24px;
`
const PamilyStatContainer = styled.View`
  width: 100%;
  height: 62px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 16px;
  position: absolute;
  z-index: 1;
  top: 210px;
`
const NoneText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
  color: ${colors.grey_400};
`
const TeamContainer = styled.View`
  flex-direction: row;
  background-color: ${colors.grey_150};
  justify-content: space-between;
  padding: 16px;
  padding-bottom: 200px;
  gap: 8px;
`
const StartTeamContainer = styled.TouchableOpacity`
  //width: 170px;
  flex: 1;
  height: 159px;
  border-radius: 8px;
  background-color: ${colors.grey_100};
  padding: 16px 16px 0px 16px;
`
const Title = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
`
const SubTitle = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 12px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.6);
`
const StartIcon = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
`
const TodoTitle = styled.View`
  padding: 24px 16px 0px 16px;
`
const TitleText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 20px;
  line-height: 28px;
  color: ${colors.grey_600};
`
const TodoContainer = styled.View`
  padding: 16px;
  justify-content: center;
  align-items: center;
`
const AllTodoButton = styled.TouchableOpacity`
  height: 44px;
  margin: 0px 16px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.primary};
`
const ButtonText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
  color: ${colors.grey_100};
`
const NoneTodoContainer = styled.View`
  display: flex;
  width: 100%;
  padding: 20px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  background-color: ${colors.grey_150};
  border-radius: 8px;
`
