import { useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodyBoldSm_Text, BodySm_Text, Detail_Text } from '../Fonts'

export const TeamSearchBox = () => {
  const teamName = useState('펫모리')
  const teamLeader = useState('신민선')
  const teamNumber = useState(9)
  const teamPrivacy = useState('비공개')
  const teamIntro = useState('한줄소개')
  return (
    <>
      <Card>
        <TeamCodeBox>
          <BodyBoldSm_Text color={colors.primary_outline}>JEkDJDK</BodyBoldSm_Text>
        </TeamCodeBox>
        <TeamContentBox>
          <TeamImage source={require('../../assets/Imgs/sample_5.png')} />
          <TeamInfoBox>
            <TeamInfoDetailBox>
              <Box>
                <Detail_Text color={colors.grey_600}>Pamily 이름</Detail_Text>
              </Box>
              <Detail_Text color={colors.grey_450}>{teamName}</Detail_Text>
            </TeamInfoDetailBox>
            <TeamInfoDetailBox>
              <Box>
                <Detail_Text color={colors.grey_600}>Pamily 대표</Detail_Text>
              </Box>
              <Detail_Text color={colors.grey_450}>{teamLeader}</Detail_Text>
            </TeamInfoDetailBox>
            <TeamInfoDetailBox>
              <Box>
                <Detail_Text color={colors.grey_600}>참여 멤버 수</Detail_Text>
              </Box>
              <Detail_Text color={colors.grey_450}>{teamNumber}명</Detail_Text>
            </TeamInfoDetailBox>
            <TeamInfoDetailBox>
              <Box>
                <Detail_Text color={colors.grey_600}>모임 공개 여부</Detail_Text>
              </Box>
              <Detail_Text color={colors.grey_450}>{teamPrivacy}</Detail_Text>
            </TeamInfoDetailBox>
          </TeamInfoBox>
        </TeamContentBox>
        <TeamIntroBox>
          <Detail_Text color={colors.grey_450}>{teamIntro}</Detail_Text>
        </TeamIntroBox>
        <JoinButton>
          <BodySm_Text color={colors.red_350}>참여하기</BodySm_Text>
        </JoinButton>
      </Card>
    </>
  )
}

const Card = styled.View`
  margin: 0px 16px;
  border-radius: 12px;
  background-color: ${colors.grey_100};
  padding: 16px;
  gap: 16px;
`
const TeamCodeBox = styled.View``
const TeamContentBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.12);
`
const TeamImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background-color: pink;
`
const TeamInfoBox = styled.View`
  gap: 6px;
`
const TeamInfoDetailBox = styled.View`
  flex-direction: row;
  gap: 16px;
`
const Box = styled.View`
  justify-content: center;
  width: 72px;
`
const TeamIntroBox = styled.View``
const JoinButton = styled.TouchableOpacity`
  background-color: ${colors.red_200};
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`
