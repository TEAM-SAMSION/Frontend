import { useEffect, useState } from 'react'
import { FlatList, Platform, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { categoryColors, colors } from '../../colors'
import BackButton from '../../assets/Svgs/chevron_back.svg'
import { deleteTeam, getAllTodoList, getTodoNum } from '../../components/MyPage/Apis'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useIsFocused } from '@react-navigation/native'
import { SelectedTeamAtom, TabBarAtom } from '../../recoil/TabAtom'
import { BodyBoldSm_Text, DetailSm_Text } from '../../components/Fonts'
import { ScreenLayout } from '../../components/Shared'
import { getLatestTeam } from '../../components/Home/Apis'

export default function DeletePamily({ route, navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)
  const setSelectedTeam = useSetRecoilState(SelectedTeamAtom)

  const deleteItem = route.params
  const userNickname = deleteItem.name
  const team = deleteItem.deleteTeam
  const teamName = team.teamName
  const teamId = team.teamId
  const teamPeriod = team.registerPeriod + 1
  const [todoNum, setTodoNum] = useState(0)
  const [todoList, setTodoList] = useState([])
  const [deleteTeamId, setDeleteTeamId] = useState()
  const [todoPage, setTodoPage] = useState(0)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            deleteItem.swipeableRefs.current.close()
            navigation.goBack()
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 16,
          }}
        >
          <BackButton width={24} height={24} />
        </TouchableOpacity>
      ),
    })

    const teamId = team.teamId
    getAllTodoList(teamId, todoPage).then((result) => {
      setTodoList(result)
    })
    getTodoNum(teamId).then((result) => {
      setTodoNum(result)
    })
    setDeleteTeamId(teamId)
  }, [])

  const loadMore = async () => {
    const newTodoList = await getAllTodoList(teamId, todoPage + 1)
    setTodoList((prevTodoList) => [...prevTodoList, ...newTodoList])
    setTodoPage((prevTodoPage) => prevTodoPage + 1)
  }

  const deletePamily = () => {
    console.log(deleteTeamId)
    deleteTeam(deleteTeamId)
  }

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
      <TeamColor style={{ backgroundColor: categoryColors[item.categoryId % 10] }} />
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
            <TeamNameText>{teamName}</TeamNameText>과 함께한 {userNickname}님의 시간
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
            <DateText>{teamPeriod}일</DateText>
          </DateContent>
        </TimeBox>
        <TodoBox>
          <TitleBox>
            <Title>
              <TeamNameText>{teamName}</TeamNameText>과 함께한 {userNickname}님의 Todo, {todoNum}개
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
          onPress={async () => {
            await deletePamily()
            getLatestTeam().then((result) => {
              if (result.teamId == deleteTeamId) {
                setSelectedTeam(null)
              } else {
                let tempArr = { id: result.teamId, name: result.teamName, auth: result.authority }
                console.log('topTeam Changed', tempArr)
                setSelectedTeam(tempArr)
              }
            })
            navigation.navigate('DeletePamily2')
          }}
          style={Platform.OS == 'android' ? { bottom: 16 } : { bottom: 0 }}
        >
          <ButtonText>나가기</ButtonText>
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
const TodoBox = styled.View`
  gap: 12px;
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
  height: 70px;
  border-radius: 16px;
  margin: 2px 2px 12px 2px;
  background-color: ${colors.grey_100};
  gap: 12px;
`
const TeamColor = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 99px;
  background-color: ${colors.primary};
`
const ContentContainer = styled.View`
  gap: 4px;
  justify-content: center;
`
const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0px;
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
  height: 420px;
`
