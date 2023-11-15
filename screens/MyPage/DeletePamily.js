import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import Update from '../../assets/Svgs/updateIcon.svg'
import { profileSample } from '../../datas/Home/data'
import { deleteTeam, getAllTodoList, getTodoNum } from '../../components/MyPage/Apis'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import { useIsFocused } from '@react-navigation/native'
import { TabBarAtom } from '../../recoil/TabAtom'
import { ScrollView } from 'react-native-gesture-handler'
import { BodyBoldSm_Text, DetailSm_Text } from '../../components/Fonts'

export default function DeletePamily({ route, navigation }) {
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)

  const deleteItem = route.params
  const userNickname = deleteItem.name
  const team = deleteItem.deleteTeam
  const teamName = team.teamName
  const teamPeriod = team.registerPeriod + 1
  const [todoNum, setTodoNum] = useState(0)
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      image: '',
      category: '펫모리(카테고리부분)',
      todoContent: '펫모리 회의',
    },
    {
      id: 2,
      image: '',
      category: '포잇',
      todoContent: '강아지 산책',
    },
  ])
  const [deleteTeamId, setDeleteTeamId] = useState()

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  useEffect(() => {
    const teamId = team.teamId
    getAllTodoList(ACCESSTOKEN, teamId).then((result) => {
      setTodoList(result)
    })
    getTodoNum(ACCESSTOKEN, teamId).then((result) => {
      setTodoNum(result)
    })
    setDeleteTeamId(teamId)
  }, [])

  const deletePamily = () => {
    console.log(deleteTeamId)
    deleteTeam(ACCESSTOKEN, deleteTeamId)
  }

  const renderItem = ({ item }) => (
    <TodoContainer
      style={{
        shadowColor: 'rgb(0,0,0)',
        shadowRadius: 2,
        shadowOpacity: 0.2,
        shadowOffset: [0, 0],
      }}
    >
      <TeamColor />
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
            <TeamNameText>{teamName}</TeamNameText>과 함께한 {userNickname}님의 시간
          </Title>
          <DateContent
            style={{
              shadowColor: 'rgb(0,0,0)',
              shadowRadius: 2,
              shadowOpacity: 0.2,
              shadowOffset: [0, 0],
            }}
          >
            <DateText>{teamPeriod}일</DateText>
          </DateContent>
        </TimeBox>
        <TodoBox>
          <TitleBox>
            <Title>
              <TeamNameText>{teamName}</TeamNameText>과 함께한 {userNickname}님의 Todo,
              {todoNum}개
            </Title>
            <Update width={32} height={32} />
          </TitleBox>
          <FlatList data={todoList} renderItem={renderItem} />
        </TodoBox>
        <DeleteButton
          onPress={() => {
            deletePamily()
            navigation.navigate('DeletePamily2')
          }}
        >
          <ButtonText>모임 탈퇴하기</ButtonText>
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
