import { useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import Update from '../../assets/Svgs/updateIcon.svg'

export default function DeletePamily({ navigation }) {
  const teamName = useState('포잇')
  const userNickname = useState('펫모리')
  const todoNum = useState(200)
  const todoList = [
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
  ]

  const renderItem = ({ item }) => (
    <TodoContainer
      id={item.id}
      style={{
        shadowColor: 'rgb(0,0,0)',
        shadowRadius: 2,
        shadowOpacity: 0.2,
        shadowOffset: [0, 0],
      }}
    >
      <TeamImage />
      <ContentContainer>
        <Category>{item.category}</Category>
        <TodoText>{item.todoContent}</TodoText>
      </ContentContainer>
    </TodoContainer>
  )

  return (
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
          <DateText>24일</DateText>
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
        <FlatList data={todoList} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </TodoBox>
      <DeleteButton onPress={() => navigation.navigate('DeletePamily2')}>
        <ButtonText>모임 탈퇴하기</ButtonText>
      </DeleteButton>
    </Container>
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
  gap: 16px;
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
  gap: 10px;
`
const TeamImage = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 8px;
  background-color: pink;
`
const ContentContainer = styled.View`
  gap: 4px;
  justify-content: center;
`
const Category = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
`
const TodoText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 14px;
  line-height: 19px;
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
