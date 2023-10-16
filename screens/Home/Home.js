import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
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

export default function Home({ navigation }) {
  const [name, setName] = useState('포잇')
  const [now, setNow] = useState(new Date(Date.now() + 9 * 60 * 60 * 1000))
  const date = parseInt(now.toISOString().substring(8, 10))
  const month = now.getMonth() + 1
  const [progress, setProgress] = useState(80)

  const PamilyNum = 0

  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  const getUserInfo = async () => {
    try {
      const url = 'https://dev.pawith.com/user'
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${ACCESSTOKEN}` },
      })
      setName(response.data.nickname)
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  const getTodoProgress = async (teamId) => {
    try {
      const url = `https://dev.pawith.com/todo/progress/${teamId}`
      const response = await axios.get(url, {
        params: { teamId: teamId },
        headers: { Authorization: `Bearer ${ACCESSTOKEN}` },
      })
      setProgress(response.data.progress)
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(() => {
    getTodoProgress(1)
  }, [])

  const [myTodo, setMyTodo] = useState('')
  // const fetchMyTodo = async () => {
  //   try {
  //   }
  // }
  // todo team 조회 -> team마다 할당 todo get
  // 할당 todo -> todo 완료 가능하도록 체크박스..

  return (
    <ScreenLayout>
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
          <PamilyChoiceToggle />
          <MainImage progress={progress} pamilyNum={PamilyNum} />
          <PamilyStatContainer>
            {PamilyNum == 0 ? <NoneText>소속된 Pamily가 없습니다.</NoneText> : <MainStat progress={progress} />}
          </PamilyStatContainer>
        </PamilyContainer>
      </BannerContainer>
      {PamilyNum == 0 ? (
        <TeamContainer>
          <StartTeamContainer
            style={{
              shadowColor: 'rgb(0,0,0)',
              shadowRadius: 4,
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
              shadowRadius: 4,
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
            {/* <FlatList
              data={myTodo}
              renderItem={({ item }) => {
                return <TodoBox data={item} />
              }}
            /> */}
            <TodoBox />
          </TodoContainer>
          <AllTodoButton onPress={() => navigation.navigate('ToDoNav')}>
            <ButtonText>전체 TODO 확인하기</ButtonText>
          </AllTodoButton>
        </>
      )}
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
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  color: #fd8d81;
`
const NickSubText = styled.Text`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`
const SubText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
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
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  color: ${colors.grey_400};
`
const TeamContainer = styled.View`
  flex-direction: row;
  background-color: ${colors.grey_150};
  justify-content: center;
  padding: 16px;
  gap: 8px;
  padding-bottom: 200px;
`
const StartTeamContainer = styled.TouchableOpacity`
  width: 170px;
  height: 159px;
  border-radius: 8px;
  background-color: ${colors.grey_100};
  padding: 16px 16px 0px 16px;
`
const Title = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
`
const SubTitle = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  color: ${colors.grey_600};
`
const TodoContainer = styled.View`
  padding: 16px;
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
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  color: ${colors.grey_100};
`
