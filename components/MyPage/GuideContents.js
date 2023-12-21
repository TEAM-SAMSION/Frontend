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
            <Content>
              안녕하세요, 서비스 포잇을 개발하고 있는 팀 펫모리입니다. 저희는 반려동물에게{' '}
              <Content style={{ color: colors.red_400 }}>‘따뜻한 사랑과 온정을 전하자'</Content>는 목표로 반려동물
              공동관리 앱서비스, 포잇을 개발하게 되었습니다.
            </Content>
            <Img
              source={require('../../assets/Imgs/guide1.png')}
              style={{ height: 115, borderRadius: 8, overflow: 'hidden' }}
            />
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
            <Title>마이 펫 관리를 함께 !</Title>
            <Content>{`포잇에서는 <Pamily>를 생성하여, Pamily 내에서 펫 관리를 할 수 있는데요.`}</Content>
            <Content>
              첫 가입시, 메인 화면의 <Content style={{ color: colors.blue_300 }}>{`[Pamily 생성하기]`}</Content> 혹은
              Pamily 선택 토글의 <Content style={{ color: colors.blue_300 }}>{`[+ 버튼], [마이페이지]`}</Content>를 통해
              Pamily를 생성할 수 있어요!
            </Content>
            <Content>
              첫 가입 이후에는 Pamily 선택 토글의 <Content style={{ color: colors.blue_300 }}>{`[+ 버튼]`}</Content>을
              통해 Pamily를 생성할 수 있어요!
            </Content>
          </Contents>
          <SubsetImage
            style={{ shadowColor: 'rgb(0,0,0)', shadowRadius: 2, shadowOpacity: 0.15, shadowOffset: [0, 0] }}
          >
            <TextContainer>
              <Title style={{ color: colors.primary_outline }}>Pamily 생성 및 참여하기</Title>
              <Content style={{ color: colors.grey_600 }}>
                홈 - 카드 및 토글을 통해 Pamily 생성 가능{'\n'}
                마이페이지 - Pamily 추가 카드를 통해 생성 가능
              </Content>
            </TextContainer>
            <Img2
              source={require('../../assets/Imgs/guide2.png')}
              style={{ height: 360, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            />
          </SubsetImage>
          <Contents>
            <Content>Pamily를 생성하지 않더라도, 누군가에게 초대를 받았다면 Pamily에 참여하실 수 있어요!</Content>
          </Contents>
        </ContentsContainer>
      )
    case 3:
      return (
        <ContentsContainer>
          <Contents>
            <Title>Pamily 초대, 어떻게 하나요?</Title>
            <Content>
              포잇에서는 [Pamily]를 생성하여 다함께 반려동물을 관리할 수 있는데요. 관리자는 모임 코드를 통해 반려동물을
              함께 관리할 Pamily를 초대할 수 있습니다.
            </Content>
            <Img source={require('../../assets/Imgs/guide3.png')} style={{ height: 196 }} />
          </Contents>
          <Contents>
            <Title>Pamily 참여, 어떻게 하나요?</Title>
            <Content>
              Pamily의 관리자가 공지한 모임 코드로 참여할 수 있어요! 검색창에 모임 코드를 입력하고 나의 pamily에
              참여해보세요!
            </Content>
            <Img source={require('../../assets/Imgs/guide4.png')} style={{ height: 196 }} />
          </Contents>
        </ContentsContainer>
      )
    case 4:
      return (
        <ContentsContainer>
          <Contents>
            <Title>TODO</Title>
            <Content>
              {`1) 카테고리 생성하기\ntodo를 생성하기 위해서는 먼저 카테고리를 생성해야해요!\n카테고리는 관리자 및 운영진이 생성할 수 있으며, 자세한 안내는 관리자 페이지에서 확인할 수 있습니다.`}
            </Content>
            <Img source={require('../../assets/Imgs/guide5.png')} style={{ height: 243 }} />
          </Contents>
          <Contents>
            <Content>{`2) todo 생성하기\n카테고리 옆 [+ 버튼]을 클릭해서 todo를 생성해보세요!\ntodo 이름과 담당자를 입력하여 todo를 생성할 수 있습니다.`}</Content>
            <Img source={require('../../assets/Imgs/guide6.png')} style={{ height: 243 }} />
          </Contents>
          <Contents>
            <Content>{`3) todo 시간설정\ntodo 생성 후 todo 박스를 한 번 더 클릭해주세요!`}</Content>
            <Img source={require('../../assets/Imgs/guide7.png')} style={{ height: 243 }} />
          </Contents>
          <Contents>
            <Content>{`4) todo 수정하기\n생성한 todo를 다시 한 번 클릭하여 수정할 수 있고, todo명과 todo 배정 날짜를 변경할 수 있습니다!`}</Content>
            <Img source={require('../../assets/Imgs/guide8.png')} style={{ height: 243 }} />
          </Contents>
          <Contents>
            <Content>{`5) todo 완료하기\n[발바닥 버튼]을 눌러주세요!\n완료시, 발바닥 색과 나의 닉네임 배경 색이 변경됩니다!`}</Content>
            <Img source={require('../../assets/Imgs/guide9.png')} style={{ height: 243 }} />
          </Contents>
        </ContentsContainer>
      )
    case 5:
      return (
        <ContentsContainer>
          <Contents>
            <Title>관리자or운영진이라면? 관리자 페이지 활용하기!</Title>
            <Content>{`1) 관리자 페이지\n관리자 페이지란 관리자와 운영진이 회원, 펫, 카테고리, 공지를 관리할 수 있는 페이지에요! 마이페이지의 '내가 속한 pamily' 중 왕관 아이콘이 있는 pamily에서 관리자 및 운영진으로 활동합니다. 왕관 아이콘을 클릭하면 관리자 페이지로 이동할 수 있습니다.`}</Content>
            <Img source={require('../../assets/Imgs/guide10.png')} style={{ height: 196 }} />
          </Contents>
          <Contents>
            <Content>{`2) 회원 관리\nPamily에 참여하는 회원을 관리할 수 있어요!\n몇 명이 참여하고 있는지 확인할 수 있고, [권한 변경]도 가능합니다.`}</Content>
            <Img source={require('../../assets/Imgs/guide11.png')} style={{ height: 196 }} />
          </Contents>
          <Contents>
            <Content>{`3) 펫 관리\nPamily에서 관리하는 반려 동물을 관리할 수 있어요! 이름과 나이 등 정보를 입력하고 반려 동물을 위한 todo를 시작해보세요!`}</Content>
            <Img source={require('../../assets/Imgs/guide12.png')} style={{ height: 196 }} />
          </Contents>
          <Contents>
            <Content>
              {`4) 카테고리 관리\ntodo 생성 시 필요한 카테고리를 관리해보세요! \n카테고리별로 todo를 정리할 수 있도록 카테고리를 추가할 수 있습니다. 더이상 활용하지 않는 카테고리는 삭제할 수 있습니다. 또한 잠시 활용하지 않는 카테고리는 '숨김 기능'을 활용할 수 있어요.`}
            </Content>
            <Img source={require('../../assets/Imgs/guide13.png')} style={{ height: 196 }} />
          </Contents>
          <Contents>
            <Content>
              {`5) 공지 등록\nPamily에게 알릴수 있는 공지 등록이 가능해요! 버전 업데이트와 함께 찾아올 예정이니 많은 관심 부탁 드려요.`}
            </Content>
          </Contents>
        </ContentsContainer>
      )
    case 6:
      return (
        <ContentsContainer>
          <Contents>
            <Title>알림</Title>
            <Content>{`우측 상단의 알림 버튼을 눌러 알림을 확인할 수 있어요!\n나에게 온 알림을 확인해보세요`}</Content>
            <Img source={require('../../assets/Imgs/guide14.png')} style={{ height: 196 }} />
          </Contents>
          <Contents>
            <Title>설정</Title>
            <Content>
              마이페이지 우측 상단의 설정 버튼을 누르면 더 자세한 설정 내용을 확인할 수 있어요! 개인정보처리방침, 서비스
              이용약관 등이 궁금하다면 설정을 확인해보세요!
            </Content>
            <Img source={require('../../assets/Imgs/guide15.png')} style={{ height: 196 }} />
          </Contents>
        </ContentsContainer>
      )
  }
}

const ContentsContainer = styled.View`
  margin-top: 12px;
  padding: 16px 0px;
  gap: 28px;
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
  color: ${colors.grey_800};
`
const Img = styled.Image`
  width: ${ScreenWidth - 32};
  overflow: visible;
`
const Img2 = styled.Image`
  width: ${ScreenWidth - 32};
`
const SubsetImage = styled.View`
  border-radius: 16px;
  background: #fff;
`
const TextContainer = styled.View`
  margin: 16px;
  gap: 4px;
`
