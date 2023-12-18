import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'

export default function PrivacyTerms() {
  return (
    <ScreenLayout>
      <Container>
        <Contents>
          앱개발 및 운영자는 앱 사용자의 개인정보를 중요시하며, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보
          보호법, 위치정보의 보호 및 이용등에 관한 법률 등 개인정보와 관련된 법령 상의 개인정보보호규정과 행정안전부 및
          방송통신위원회 등 유관기관이 제정한 가이드라인을 준수하고 있습니다. 또한 사용자의 개인정보를 보호하고 이와
          관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 공개합니다.
        </Contents>
        <Box>
          <TitleText>수집하는 개인정보 항목</TitleText>
          <Contents>
            포잇은 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.{'\n'}포잇 회원가입 시 수집하는 개인정보는
            다음과 같습니다.{'\n'}
            서비스에 처음 가입하는 과정에서 서비스 내 개별 어플리케이션이나 프로그램 등을 통하여 ‘이메일’ 을 수집하게
            됩니다.{'\n'}서비스 이용과정에서 이용자로부터 수집하는 개인정보는 다음과 같습니다.{'\n'}서비스 이용과정에서
            IP주소, 쿠키, 방문 일시 및 불량 이용 일시, 기기정보 등 서비스 이용 기록이 생성되어 수집될 수 있습니다.{'\n'}
            구체적으로, 1{')'} 정보통신서비스 제공자는 서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방식으로
            생성하여 저장하고, 2{')'} 이용자 기기의 고유정보를 안전한 형태로 변환하여 수집하는 것을 의미합니다.{'\n'}
            포잇은 다음과 같은 기업방법을 통해 개인정보를 수집합니다.{'\n'}서비스 이용과정 및 서비스 이용과정에서
            이용자가 개인정보 수집에 동의하고 직접 해당 정보를 입력하는 경우 개인정보가 수집됩니다.{'\n'}기기정보 등
            생성정보는 모바일 앱 이용과정에서 자동으로 생성되어 수집될 수 있습니다.
          </Contents>
        </Box>
        <Box>
          <TitleText>개인정보의 처리 목적</TitleText>
          <Contents>
            당사는 회원 관리, 서비스 개발, 서비스 제공 및 개선, 안전한 인터넷 이용 환경 구축 등 다음의 목적으로만
            개인정보를 이용합니다.
          </Contents>
        </Box>
        <Box>
          <TitleText>개인정보의 처리 및 보유기간</TitleText>
          <Contents>
            - 사용자의 별도 동의가 있는 경우나 법령에 규정된 경우를 제외하고는 수집된 개인정보를 본 서비스를 이용하는
            회원을 제외하고 나머지 제3자에게 제공하지 않습니다.{'\n'}- 사용자가 앱에서 제공하는 서비스를 이용하는 동안은
            사용자의 개인정보를 계속적으로 보유하지만 서비스 이용이 중지되면 개인정보는 즉시 삭제됩니다. 또한 사용자가
            직접 개인정보 삭제를 요청한 경우 즉시 삭제처리합니다.
          </Contents>
        </Box>
      </Container>
    </ScreenLayout>
  )
}

const Container = styled.View`
  margin: 16px;
  gap: 24px;
`
const Box = styled.View``
const TitleText = styled.Text`
  font-family: 'Spoqa-Bold';
  color: ${colors.grey_700};
  font-size: 12px;
  font-style: normal;
  line-height: 21.6px;
`
const Contents = styled.Text`
  font-family: 'Spoqa-Regular';
  color: ${colors.grey_700};
  font-size: 12px;
  font-style: normal;
  line-height: 21.6px;
`
