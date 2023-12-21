import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Image, RefreshControl, ScrollView, View } from 'react-native'
import { ScreenLayout } from '../../components/Shared'
import { TopHeader } from '../../components/Home/TopHeader'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { MainStat } from '../../components/Home/MainStat'
import { PamilyChoiceToggle } from '../../components/Home/PamilyChoiceToggle'
import { MainImage } from '../../components/Home/MainImage'
import { TodoBox } from '../../components/Home/TodoBox'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { getMyTodoList, getTeamList, getTodoProgress, getUserInfo } from '../../components/Home/Apis'
import { useIsFocused } from '@react-navigation/native'
import { BodySm_Text, DetailSm_Text } from '../../components/Fonts'
import { SelectedTeamAtom, TabBarAtom } from '../../recoil/TabAtom'
import Swiper from 'react-native-swiper'
import RightIcon from '../../assets/Svgs/chevron_right.svg'
import { ChristmasModal } from './ChristmasModal'
import { checkVersionTemp } from '../../utils/VersionControl'

export default function Home({ navigation }) {
  const isFocused = useIsFocused()
  const setIsTabVisible = useSetRecoilState(TabBarAtom)
  useEffect(() => {
    isFocused && setIsTabVisible(true)
  }, [isFocused])

  const [name, setName] = useState('')
  const now = new Date()
  const date = now.getDate()
  const month = now.getMonth() + 1
  const [pamilyList, setPamilyList] = useState([])
  const [progress, setProgress] = useState(0)
  const [pamilyNum, setPamilyNum] = useState(0)
  const [updated, setUpdated] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [isDog, setIsDog] = useState(true)

  const [selectedTeam, setSelectedTeam] = useRecoilState(SelectedTeamAtom)

  const getUserNickname = () => {
    getUserInfo().then((result) => {
      setName(result.nickname)
    })
  }

  const fetchTeamList = () => {
    getTeamList().then((result) => {
      setPamilyList(result)
      // console.log('fetchTeamList:', result)
      if (result.length !== 0 && selectedTeam) {
        //selectedTeam이 null인 극 초반에 실행돼서, fetchProgress에서 null의 id를 인자로 전달하는 경우 생김. -> selectedTeam이 null이 아닐때 fetchProgress()실행할 수 있도록함
        fetchProgress()
      }
      if (result.length == 0) {
        setPamilyNum(0)
        setMyTodo([])
      }
    })
  }

  const fetchProgress = () => {
    getTodoProgress(selectedTeam.id).then((result) => {
      console.log('fetchProgress:', result)
      setProgress(result)
    })
  }
  const fetchData = async () => {
    try {
      // 닉네임 가져오기
      getUserNickname()

      // 팀 목록 가져오기
      const teamList = await getTeamList()
      if (teamList.length > 0) {
        //teamList가 없을수도 있음
        setPamilyList(teamList)
        if (selectedTeam?.auth == undefined || selectedTeam == null) {
          //왜인지는 모르겠으나, 초기값이 null이 아닌 {"auth": undefined, "id": undefined, "name": undefined}임 ->이에 맞춰 조건 추가
          setSelectedTeam({
            id: teamList[0]?.teamId,
            name: teamList[0]?.teamName,
            auth: teamList[0]?.authority,
          })
        }
        setPamilyNum(1)
        if (selectedTeam && selectedTeam.id != undefined) {
          const todoList = await getMyTodoList(selectedTeam.id) //selectedTeam.id 다이렉트로 전달
          setResultArray(todoList)
          setMyTodo(todoList)
          // const progress = await getTodoProgress( teamList[selectedTeam.id].teamId)
          const progress = await getTodoProgress(selectedTeam.id)
          setProgress(progress)
        }
        // const todoList = await getMyTodoList( teamList[selectedTeam.id].teamId)  //selectedTeam.id는 로컬에 저장된 어레이의 위치값을 표시하는 것이 아닌, 서버 내에서의 team 위치를 파악하기 위한 인텍스이다
      } else {
        setPamilyNum(0)
        setMyTodo([])
      }
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }
  useEffect(() => {
    checkVersionTemp()
    getUserNickname()
    fetchData()
  }, [])

  useEffect(() => {
    fetchMyTodo()
  }, [isFocused, pamilyList, todoPage])

  useEffect(() => {
    fetchTeamList() //너무 빨리 실행됨
    fetchMyTodo()
  }, [isFocused, updated, selectedTeam, pamilyNum])

  const [myTodo, setMyTodo] = useState([])
  const [todoPage, setTodoPage] = useState(0)

  const fetchMyTodo = async () => {
    pamilyNum &&
      (await getMyTodoList(selectedTeam?.id).then(async (result) => {
        setResultArray(result)
        setMyTodo(result)
      }))
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

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    if (selectedTeam) {
      fetchData()
      fetchProgress()
    }
    // fetchTeamList()//내가 다 이해를 못해서 그런걸수도 있는데, 기존 3개 함수가 동시에 실행되면서 함수간에 공유하는 변수가 일치하지 않거나 null값을 성급하게 받아서 중간에 에러가 터지는거 같음, 이거 처음에 다 받는 fetchData()함수로 통일했는데, 맘에 안들면 밑에 3개 주석 풀면됨
    // fetchMyTodo()
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [selectedTeam, pamilyNum, pamilyList])

  return (
    <ScreenLayout>
      <TopHeader navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}
      >
        <BannerContainer>
          <NickBox>
            <NicknameContainer>
              <NickText>{name} </NickText>
              <NickSubText>님,</NickSubText>
            </NicknameContainer>
            <SubText>오늘도 포잇과 함께 마이펫을 관리해볼까요?</SubText>
          </NickBox>
          <PamilyContainer>
            <PamilyChoiceToggle pamilyList={pamilyList} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
            <MainImage isDog={isDog} progress={progress} pamilyNum={pamilyNum} />
            <PamilyStatContainer>
              {pamilyNum == 0 ? (
                <NoneText>소속된 Pamily가 없습니다</NoneText>
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
                <Image source={require('../../assets/Imgs/joinPaw.png')} style={{ width: 70, height: 70 }} />
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
                <Image source={require('../../assets/Imgs/CreatePaw.png')} style={{ width: 70, height: 70 }} />
              </StartIcon>
            </StartTeamContainer>
          </TeamContainer>
        ) : (
          <>
            <TodoTitle>
              <TitleText>
                {month}월 {date}일, 나에게 할당된 TODO
              </TitleText>
              <IconBox onPress={() => navigation.navigate('ToDoNav', { screen: 'Todo' })}>
                <RightIcon width={24} height={24} color={colors.grey_450} />
              </IconBox>
            </TodoTitle>
            <TodoContainer>
              {myTodo.length == 0 ? (
                <>
                  <NoneTodoContainer>
                    <BodySm_Text color={colors.grey_600}>아직 나에게 할당된 TODO가 없어요!</BodySm_Text>
                    <DetailSm_Text color={colors.grey_400}>
                      TODO 담당자를 수정하거나, 새로운 TODO를 생성해보세요!
                    </DetailSm_Text>
                  </NoneTodoContainer>
                  {/* <AllTodoButton onPress={() => navigation.navigate('ToDoNav', { screen: 'Todo' })}>
                    <ButtonText>전체 TODO 확인하기</ButtonText>
                  </AllTodoButton> */}
                </>
              ) : myTodo.length < 5 ? (
                <FlatList
                  style={{ marginBottom: 8 }}
                  data={myTodo}
                  renderItem={({ item, index }) => {
                    return <TodoBox data={item} index={index} updated={updated} setUpdated={setUpdated} />
                  }}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <View height={376}>
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
                          return <TodoBox data={item} index={index} updated={updated} setUpdated={setUpdated} />
                        }}
                        showsHorizontalScrollIndicator={false}
                      />
                    ))}
                  </Swiper>
                </View>
              )}
            </TodoContainer>
          </>
        )}
      </ScrollView>
      <ChristmasModal />
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
  gap: 12px;
`
const StartTeamContainer = styled.TouchableOpacity`
  //width: 170px;
  flex: 1;
  height: 159px;
  border-radius: 8px;
  background-color: ${colors.grey_100};
  padding: 16px 16px 0px 16px;
  gap: 4px;
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
  right: 12px;
  bottom: 0;
`
const TodoTitle = styled.View`
  flex-direction: row;
  padding: 24px 16px 0px 16px;
  justify-content: space-between;
  align-items: center;
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
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.red_350};
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
  background-color: ${colors.grey_200};
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
`

const PaginationActiveDot = styled.View`
  background-color: ${colors.grey_450};
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
`
const IconBox = styled.TouchableOpacity``
