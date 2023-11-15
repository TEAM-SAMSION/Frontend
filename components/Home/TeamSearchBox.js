import { useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodyBoldSm_Text, BodySm_Text, Detail_Text, SubHeadSm_Text, SubHead_Text } from '../Fonts'
import { ModalPopUp } from '../Shared'
import { postJoiningTeam } from './Apis'
import Close from '../../assets/Svgs/Close.svg'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import ToDoNav from '../../navigators/ToDoNav'

export const TeamSearchBox = (props) => {
  const [visible, setVisible] = useState(false)
  const ACCESSTOKEN = useRecoilValue(accessTokenState)

  const data = props.data
  const teamCode = data.code
  const teamName = data.teamName
  const teamLeader = data.presidentName
  const teamNumber = data.registerCount
  const teamIntro = data.description
  const teamImageUrl = data.teamImageUrl

  const navigation = useNavigation()

  return (
    <>
      <Card>
        <TeamCodeBox>
          <BodyBoldSm_Text color={colors.primary_outline}>{teamCode}</BodyBoldSm_Text>
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
            {/* <TeamInfoDetailBox>
              <Box>
                <Detail_Text color={colors.grey_600}>모임 공개 여부</Detail_Text>
              </Box>
              <Detail_Text color={colors.grey_450}>{teamPrivacy}</Detail_Text>
            </TeamInfoDetailBox> */}
          </TeamInfoBox>
        </TeamContentBox>
        <TeamIntroBox>
          <Detail_Text color={colors.grey_450}>{teamIntro}</Detail_Text>
        </TeamIntroBox>
        <JoinButton onPress={() => setVisible(true)}>
          <BodySm_Text color={colors.red_350}>참여하기</BodySm_Text>
        </JoinButton>
      </Card>
      <ModalPopUp visible={visible} petIcon={false} height={217}>
        <ModalHeader>
          <CloseButton
            onPress={() => {
              setVisible(false)
              setIsOpen(false)
            }}
          >
            <Close width={24} height={24} />
          </CloseButton>
        </ModalHeader>
        <PopContent>
          <SubHead_Text color={colors.grey_700}>{teamName}</SubHead_Text>
          <SubHeadSm_Text color={colors.grey_500}>Pamily와 함께하시겠습니까?</SubHeadSm_Text>
        </PopContent>
        <PopButtonContainer>
          <PopButton
            onPress={() => {
              setVisible(false)
            }}
            style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
          >
            <BodySm_Text color={colors.red_350}>아니오</BodySm_Text>
          </PopButton>
          <PopButton
            onPress={() => {
              console.log(teamCode)
              postJoiningTeam(ACCESSTOKEN, teamCode)
              setVisible(false)
              navigation.navigate('ToDoNav')
            }}
          >
            <BodySm_Text color={colors.red_350}>예</BodySm_Text>
          </PopButton>
        </PopButtonContainer>
      </ModalPopUp>
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
const PopContent = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`
const PopButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
const PopButton = styled.TouchableOpacity`
  display: flex;
  flex: 1 0 0;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.red_200};
`
const CloseButton = styled.TouchableOpacity``
const ModalHeader = styled.View`
  width: '100%';
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 24px;
`
