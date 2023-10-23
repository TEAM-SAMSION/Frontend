import { useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'

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
          <TeamCodeText>JEkDJDK</TeamCodeText>
        </TeamCodeBox>
        <TeamContentBox>
          <TeamImage source={require('../../assets/Imgs/sample_5.png')} />
          <TeamInfoBox>
            <TeamInfoDetailBox>
              <Box>
                <Category>Pamily 이름</Category>
              </Box>
              <Info>{teamName}</Info>
            </TeamInfoDetailBox>
            <TeamInfoDetailBox>
              <Box>
                <Category>Pamily 대표</Category>
              </Box>
              <Info>{teamLeader}</Info>
            </TeamInfoDetailBox>
            <TeamInfoDetailBox>
              <Box>
                <Category>참여 멤버 수</Category>
              </Box>

              <Info>{teamNumber}명</Info>
            </TeamInfoDetailBox>
            <TeamInfoDetailBox>
              <Box>
                <Category>모임 공개 여부</Category>
              </Box>

              <Info>{teamPrivacy}</Info>
            </TeamInfoDetailBox>
          </TeamInfoBox>
        </TeamContentBox>
        <TeamIntroBox>
          <TeamIntroText>{teamIntro}</TeamIntroText>
        </TeamIntroBox>
        <JoinButton>
          <ButtonText>참여하기</ButtonText>
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
const TeamCodeText = styled.Text`
  color: ${colors.primary_outline};
  font-family: Spoqa Han Sans Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
`
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
const Category = styled.Text`
  color: ${colors.grey_600};
  font-family: Spoqa Han Sans Neo;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
`
const Info = styled.Text`
  color: ${colors.grey_450};
  font-family: Spoqa Han Sans Neo;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
`

const TeamIntroBox = styled.View``
const TeamIntroText = styled.Text`
  color: ${colors.grey_450};
  font-family: Spoqa Han Sans Neo;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
`
const JoinButton = styled.TouchableOpacity`
  background-color: ${colors.primary_container};
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`
const ButtonText = styled.Text`
  color: ${colors.primary};
  font-family: Spoqa Han Sans Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`
