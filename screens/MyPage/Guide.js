import { Text, View } from 'react-native'
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
      <Container>
        <TopButtonContainer>
          <TopButton active={active === 1} onPress={() => setActive(1)}>
            <ButtonText active={active === 1}>팀 소개</ButtonText>
          </TopButton>
          <TopButton active={active === 2} onPress={() => setActive(2)}>
            <ButtonText active={active === 2}>초대하기</ButtonText>
          </TopButton>
          <TopButton active={active === 3} onPress={() => setActive(3)}>
            <ButtonText active={active === 3}>TODO</ButtonText>
          </TopButton>
          <TopButton active={active === 4} onPress={() => setActive(4)}>
            <ButtonText active={active === 4}>관리자페이지</ButtonText>
          </TopButton>
        </TopButtonContainer>
        <TopButtonContainer>
          <TopButton active={active === 5} onPress={() => setActive(5)}>
            <ButtonText active={active === 5}>알림</ButtonText>
          </TopButton>
          <TopButton active={active === 6} onPress={() => setActive(6)}>
            <ButtonText active={active === 6}>설정</ButtonText>
          </TopButton>
        </TopButtonContainer>
        <Contents>
          <GuideContents active={active} />
        </Contents>
      </Container>
    </ScreenLayout>
  )
}

const Container = styled.View`
  margin: 12px 16px 0px 16px;
`
const TopButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
const TopButton = styled.Pressable`
  padding: 8px 12px;
  height: 35px;
  border-radius: 99px;
  margin: 4px 0px;
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
