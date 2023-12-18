import styled from 'styled-components/native'
import { colors } from '../../colors'
import { Image } from 'react-native'
import { ScreenWidth } from '../Shared'

export const GuideContents = (props) => {
  switch (props.active) {
    case 1:
      return (
        <ContentsContainer>
          <Contents>
            <Title>팀 소개</Title>
            <Content>
              안녕하세요, 서비스 포잇을 개발하고 있는 팀 펫모리입니다. 저희는 반려동물에게{' '}
              <Content style={{ color: colors.red_400 }}>‘따뜻한 사랑과 온정을 전하자'</Content>는 목표로 반려동물
              공동관리 앱서비스, 포잇을 개발하게 되었습니다.
            </Content>
            <Img source={require('../../assets/Imgs/guide1.png')} style={{ height: 115 }} />
            <Content>
              우리 집 앞에 떠돌던 길 고양이, 길 강아지에게 간식을 주거나, 밥을 챙겨줬던 경험이 있으신가요?
            </Content>
            <Content>
              반려동물을 키우면서, 반려인끼리 소통을 하지않아 식사를 챙겨주는 것을 까먹었다던지, 식사를 두 번 줬다던지
              하는 경험 있으신가요?
            </Content>
            <Content>
              저희 서비스 ‘포잇’은 길 강아지, 길 고양이, 그리고 우리의 반려동물을 함께 키울 수 있는, 공동 관리 앱
              입니다.
            </Content>
          </Contents>
        </ContentsContainer>
      )
    case 2:
      return (
        <ContentsContainer>
          <Contents>
            <Title>1. 마이 펫 관리를 함께 !</Title>
          </Contents>
        </ContentsContainer>
      )
  }
}

const ContentsContainer = styled.View`
  margin-top: 12px;
  padding: 16px 0px;
`
const Contents = styled.View`
  gap: 16px;
`
const Title = styled.Text`
  font-family: 'Spoqa-Bold';
  color: ${colors.red_350};
  font-size: 16px;
  line-height: 22px;
`
const Content = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 22.4px;
`
const Img = styled.Image`
  width: ${ScreenWidth - 32};
  border-radius: 16px;
`
