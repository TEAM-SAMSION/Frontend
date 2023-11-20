import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScreenLayout, ScreenWidth } from '../../components/Shared'
import { TopHeader } from '../../components/Home/TopHeader'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import Plus from '../../assets/Svgs/plus.svg'
import Go from '../../assets/Svgs/go.svg'
import { MainStat } from '../../components/Home/MainStat'
import { PamilyChoiceToggle } from '../../components/Home/PamilyChoiceToggle'
import { MainImage } from '../../components/Home/MainImage'
import { TodoBox } from '../../components/Home/TodoBox'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { getMyTodoList, getTeamList, getTodoProgress, getUserInfo } from '../../components/Home/Apis'
import { StackActions, useIsFocused } from '@react-navigation/native'
import { BodySm_Text, DetailSm_Text } from '../../components/Fonts'
import { TabBarAtom } from '../../recoil/TabAtom'
import Swiper from 'react-native-swiper'

export default function Home({ navigation }) {
  const isFocused = useIsFocused()
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const setIsTabVisible = useSetRecoilState(TabBarAtom)

  useEffect(() => {
    isFocused && setIsTabVisible(true)
  }, [isFocused])

  const [name, setName] = useState('포잇')
  const [now, setNow] = useState(new Date(Date.now() + 9 * 60 * 60 * 1000))
  const date = parseInt(now.toISOString().substring(8, 10))
  const month = now.getMonth() + 1
  const [pamilyList, setPamilyList] = useState([])
  const [progress, setProgress] = useState(0)
  const [pamilyNum, setPamilyNum] = useState(0)
  const [topTeamId, setTopTeamId] = useState(0)
  const [topTeamName, setTopTeamName] = useState('')
  const [updated, setUpdated] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [isDog, setIsDog] = useState(true)

  const getUserNickname = () => {
    getUserInfo(ACCESSTOKEN).then((result) => {
      setName(result.nickname)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 닉네임 가져오기
        await getUserNickname()

        // 팀 목록 가져오기
        const teamList = await getTeamList(ACCESSTOKEN)
        setPamilyList(teamList)

        if (teamList.length !== 0) {
          setPamilyNum(1)
          setTopTeamId(teamList[0].teamId)
          setTopTeamName(teamList[0].teamName)

          // Todo 데이터 가져오기
          const todoList = await getMyTodoList(ACCESSTOKEN, teamList[0].teamId)
          setResultArray(todoList)
          setMyTodo(todoList)

          // 진행 상황 가져오기
          const progress = await getTodoProgress(ACCESSTOKEN, teamList[0].teamId)
          setProgress(progress)
        } else {
          setPamilyNum(0)
          setMyTodo([])
        }
      } catch (error) {
        console.error('에러 발생:', error)
      }
    }

    fetchData()
  }, [])

  const fetchTeamList = () => {
    getTeamList(ACCESSTOKEN).then((result) => {
      setPamilyList(result)
      if (result.length !== 0) {
        fetchProgress()
      }
      if (result.length == 0) {
        setPamilyNum(0)
        setMyTodo([])
      }
    })
  }

  const setTeamId = () => {
    setPamilyNum(1)
    setTopTeamId(pamilyList[0].teamId)
    console.log(topTeamId)
    setTopTeamName(pamilyList[0].teamName)
  }

  const fetchProgress = () => {
    getTodoProgress(ACCESSTOKEN, topTeamId).then((result) => {
      setProgress(result)
      //console.log(progress)
    })
  }

  useEffect(() => {
    getUserNickname()
  }, [isFocused])

  useEffect(() => {
    fetchTeamList()
    pamilyNum !== 0 && fetchMyTodo()
  }, [isFocused, updated, topTeamId, pamilyNum])

  const [myTodo, setMyTodo] = useState([])
  const [todoPage, setTodoPage] = useState(0)

  const fetchMyTodo = () => {
    pamilyNum &&
      getMyTodoList(ACCESSTOKEN, topTeamId).then((result) => {
        setResultArray(result)
        setMyTodo(result)
      })
  }

  const setResultArray = (result) => {
    const chunkSize = 4
    const resultArray = []
    for (let i = 0; i < result.length; i += chunkSize) {
      const chunk = result.slice(i, i + chunkSize)
      resultArray.push(chunk)
    }
    setTodoList(resultArray)
  }

  useEffect(() => {
    fetchMyTodo()
  }, [isFocused, pamilyList, todoPage])

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
            <PamilyChoiceToggle
              pamilyList={pamilyList}
              topTeamName={topTeamName}
              setTopTeamName={setTopTeamName}
              topTeamId={topTeamId}
              setTopTeamId={setTopTeamId}
            />
            <MainImage isDog={isDog} progress={progress} pamilyNum={pamilyNum} />
            <PamilyStatContainer>
              {pamilyNum == 0 ? (
                <NoneText>소속된 Pamily가 없습니다.</NoneText>
              ) : (
                <MainStat isDog={isDog} setIsDog={setIsDog} progress={progress} />
              )}
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
              ) : myTodo.length < 5 ? (
                <FlatList
                  style={{ marginBottom: 8 }}
                  data={myTodo}
                  renderItem={({ item, index }) => {
                    return (
                      <TodoBox
                        data={item}
                        index={index}
                        accessToken={ACCESSTOKEN}
                        updated={updated}
                        setUpdated={setUpdated}
                      />
                    )
                  }}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                />
              ) : (
                <View style={{ height: 200 }}>
                  <Swiper
                    loop={false}
                    showsPagination={true}
                    dot={<PaginationDot />}
                    activeDot={<PaginationActiveDot />}
                  >
                    {todoList.map((page) => (
                      <FlatList
                        data={page}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => {
                          return (
                            <TodoBox
                              data={item}
                              index={index}
                              accessToken={ACCESSTOKEN}
                              updated={updated}
                              setUpdated={setUpdated}
                            />
                          )
                        }}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                      />
                    ))}
                  </Swiper>
                </View>
              )}
            </TodoContainer>
            <AllTodoButton onPress={() => navigation.navigate('ToDoNav', { screen: 'ToDo' })}>
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
  background-color: ${colors.primary_container};
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
  color: ${colors.primary_outline};
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
  justify-content: space-between;
  padding: 24px 16px 16px 16px;
  padding-bottom: 200px;
  gap: 12px;
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
  padding-bottom: 0px;
  justify-content: center;
  align-self: stretch;
  flex-wrap: wrap;
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
  margin-bottom: 16px;
`
const PaginationDot = styled.View`
  background-color: ${colors.primary_container};
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
`

const PaginationActiveDot = styled.View`
  background-color: ${colors.primary};
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
`
