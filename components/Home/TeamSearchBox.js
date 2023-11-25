import { useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import {
  BodyBoldSm_Text,
  BodyBold_Text,
  BodySm_Text,
  Body_Text,
  Detail_Text,
  SubHeadSm_Text,
  SubHead_Text,
} from '../Fonts'
import { ModalPopUp } from '../Shared'
import { getLatestTeam, postJoiningTeam } from './Apis'
import Close from '../../assets/Svgs/Close.svg'
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accessTokenState } from '../../recoil/AuthAtom'
import ToDoNav from '../../navigators/ToDoNav'
import ErrorIcon from '../../assets/Svgs/error.svg'
import { SelectedTeamAtom } from '../../recoil/TabAtom'

export const TeamSearchBox = (props) => {
  const [visible, setVisible] = useState(false)
  const [isDuplicated, setIsDuplicated] = useState(false)
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const setSelectedTeam = useSetRecoilState(SelectedTeamAtom)

  const data = props.data
  const teamCode = data.code
  const teamId = data.teamId
  const teamName = data.teamName
  const teamLeader = data.presidentName
  const teamNumber = data.registerCount
  const teamIntro = data.description
  const teamImageUrl = data.teamImageUrl

  const navigation = useNavigation()

  const joinTeam = async () => {
    try {
      await postJoiningTeam(ACCESSTOKEN, teamCode)
      let tempArr = { id: teamId, name: teamName, auth: 'MEMBER' }
      setSelectedTeam(tempArr)
      setVisible(false)
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: 'Home' }],
        }),
      )
      navigation.navigate('ToDoNav', { screen: 'Todo' })
    } catch (error) {
      setVisible(false)
      setIsDuplicated(true)
    }
  }

  return (
    <>
      <Card>
        <TeamCodeBox>
          <BodyBoldSm_Text color={colors.primary_outline}>{teamCode}</BodyBoldSm_Text>
        </TeamCodeBox>
        <TeamContentBox>
          <TeamImage source={{ uri: teamImageUrl }} />
          <TeamInfoBox>
            <BodyBoldSm_Text color={colors.grey_600}>Pamily 이름</BodyBoldSm_Text>
            <BodyBoldSm_Text color={colors.grey_600}>Pamily 대표</BodyBoldSm_Text>
            <BodyBoldSm_Text color={colors.grey_600}>참여 멤버 수</BodyBoldSm_Text>
          </TeamInfoBox>
          <TeamInfoBox>
            <BodySm_Text color={colors.grey_450}>{teamName}</BodySm_Text>
            <BodySm_Text color={colors.grey_450}>{teamLeader}</BodySm_Text>
            <BodySm_Text color={colors.grey_450}>{teamNumber}명</BodySm_Text>
          </TeamInfoBox>
        </TeamContentBox>
        <TeamIntroBox>
          <BodySm_Text color={colors.grey_450}>{teamIntro}</BodySm_Text>
        </TeamIntroBox>
        <JoinButton onPress={() => setVisible(true)}>
          <BodyBoldSm_Text color={colors.red_350}>참여하기</BodyBoldSm_Text>
        </JoinButton>
      </Card>
      <ModalPopUp visible={visible} petIcon={false} height={217}>
        <ModalHeader>
          <CloseButton
            onPress={() => {
              setVisible(false)
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
              joinTeam()
            }}
          >
            <BodySm_Text color={colors.red_350}>예</BodySm_Text>
          </PopButton>
        </PopButtonContainer>
      </ModalPopUp>
      <ModalPopUp visible={isDuplicated} petIcon={false} height={159}>
        <ModalHeader style={{ marginBottom: 0 }}>
          <CloseButton
            onPress={() => {
              setIsDuplicated(false)
            }}
          >
            <Close width={24} height={24} />
          </CloseButton>
        </ModalHeader>
        <PopContent style={{ marginBottom: 22 }}>
          <ErrorBox>
            <ErrorIcon width={48} height={48} color={colors.grey_100} />
          </ErrorBox>
          <Body_Text>이미 해당 Pamily에 참여중 입니다!</Body_Text>
        </PopContent>
      </ModalPopUp>
    </>
  )
}

const Card = styled.View`
  margin: 0px 16px;
  border-radius: 12px;
  background-color: ${colors.grey_100};
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 16px;
  gap: 10px;
`
const TeamCodeBox = styled.View``
const TeamContentBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.12);
`
const TeamImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  margin-right: 4px;
`
const TeamInfoBox = styled.View`
  gap: 6px;
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
const ErrorBox = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${colors.primary_outline};
  margin-bottom: 12px;
  align-items: center;
  justify-content: center;
`
