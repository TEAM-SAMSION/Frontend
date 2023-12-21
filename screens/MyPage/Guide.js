import { ScrollView, Text, View } from 'react-native'
import { ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useState } from 'react'
import { BodyBold_Text } from '../../components/Fonts'
import { GuideContents } from '../../components/MyPage/GuideContents'

export default function Guide() {
  const [active, setActive] = useState(1)

  return (
    <ScreenLayout>
      <AllContainer showsVerticalScrollIndicator={false}>
        <TopContainer horizontal showsHorizontalScrollIndicator={false}>
          <TopButton active={active === 1} onPress={() => setActive(1)}>
            <ButtonText active={active === 1}>팀 소개</ButtonText>
          </TopButton>
          <TopButton active={active === 2} onPress={() => setActive(2)}>
            <ButtonText active={active === 2}>Pamily</ButtonText>
          </TopButton>
          <TopButton active={active === 3} onPress={() => setActive(3)}>
            <ButtonText active={active === 3}>Pamily 초대/참여</ButtonText>
          </TopButton>
          <TopButton active={active === 4} onPress={() => setActive(4)}>
            <ButtonText active={active === 4}>TODO</ButtonText>
          </TopButton>
          <TopButton active={active === 5} onPress={() => setActive(5)}>
            <ButtonText active={active === 5}>관리자페이지</ButtonText>
          </TopButton>
          <TopButton active={active === 6} onPress={() => setActive(6)}>
            <ButtonText active={active === 6}>알림/설정</ButtonText>
          </TopButton>
        </TopContainer>
        <Container>
          <Contents>
            <GuideContents active={active} />
          </Contents>
        </Container>
      </AllContainer>
    </ScreenLayout>
  )
}

const Container = styled.View`
  margin: 0px 16px;
`
const TopContainer = styled.ScrollView`
  margin: 16px;
  margin-bottom: 0;
`
const TopButton = styled.Pressable`
  padding: 8px 12px;
  height: 35px;
  border-radius: 99px;
  margin: 4px 4px;
  background-color: ${(props) => (props.active ? colors.primary_container : colors.grey_150)};
  align-items: center;
  justify-content: center;
`
const ButtonText = styled.Text`
  color: ${(props) => (props.active ? colors.red_350 : colors.grey_800)};
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  font-style: normal;
  line-height: 19px;
`
const Contents = styled.View``
const AllContainer = styled.ScrollView``
