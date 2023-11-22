import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ModalPopUp, ScreenLayout } from '../../components/Shared'
import {
  BodyBoldSm_Text,
  BodyBold_Text,
  Body_Text,
  Detail_Text,
  Label_Text,
  SubHead_Text,
} from '../../components/Fonts'
import { TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import EditIcon from '../../assets/Svgs/Edit.svg'
import QuestionMark from '../../assets/Svgs/Question_mark.svg'
import Right from '../../assets/Svgs/chevron_right.svg'
import Close from '../../assets/Svgs/Close.svg'
import { useIsFocused } from '@react-navigation/native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { TabBarAtom } from '../../recoil/TabAtom'
import { getTeamInfo } from '../../components/Administrator/Apis'
import { accessTokenState } from '../../recoil/AuthAtom'
import CrownIcon from '../../assets/Svgs/Crown.svg'

export default function AdminHome({ route, navigation }) {
  const ACCESSTOKEN = useRecoilValue(accessTokenState)
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)

  const data = route.params
  const teamId = data.item.teamId
  const myAuthority = data.item.authority
  const period = data.item.registerPeriod
  //console.log(data)
  const [name, setName] = useState('')
  const [intro, setIntro] = useState('')
  const [profileUrl, setProfileUrl] = useState('')
  const [memberNum, setMemberNum] = useState()
  const [petNum, setPetNum] = useState()
  const [teamCode, setTeamCode] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isInfoVisible, setIsInfoVisible] = useState(false)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  useEffect(() => {
    getTeamInfo(ACCESSTOKEN, teamId).then((result) => {
      setIntro(result.teamDescription)
      setPetNum(result.teamPetCount)
      setMemberNum(result.teamMemberCount)
      setTeamCode(result.todoTeamCode)
    })
    setName(data.item.teamName)
    setProfileUrl(data.item.teamProfileImageUrl)
  }, [isFocused])

  return (
    <ScreenLayout>
      <UserContainer>
        <UserDetailContainer>
          <ProfileImage
            source={{
              uri: `${profileUrl}`,
            }}
          />
          <UserBox>
            <SubHead_Text>{name}</SubHead_Text>
            <Detail_Text color={colors.grey_600}>{intro}</Detail_Text>
          </UserBox>
        </UserDetailContainer>
        {myAuthority == 'PRESIDENT' ? (
          <EditBox
            onPress={() =>
              navigation.navigate('EditPamily', { name, intro, profileUrl, teamCode, teamId, myAuthority, period })
            }
          >
            <EditIcon width={16} height={16} color={'#4D4D4D'} />
          </EditBox>
        ) : (
          ''
        )}
      </UserContainer>
      <GroupInfoContainer>
        <GroupInfoBox>
          <Body_Text color={colors.grey_500}>총 회원</Body_Text>
          <BodyBold_Text color={colors.grey_700}>{memberNum}명</BodyBold_Text>
        </GroupInfoBox>
        <Bar />
        <GroupInfoBox>
          <Body_Text color={colors.grey_500}>함께하는 펫</Body_Text>
          <BodyBold_Text color={colors.grey_700}>{petNum}마리</BodyBold_Text>
        </GroupInfoBox>
      </GroupInfoContainer>
      <GroupContainer>
        <TitleBox>
          <BodyBold_Text>관리자 권한 기능</BodyBold_Text>
          <TouchableOpacity
            onPress={() => {
              setIsInfoVisible(true)
            }}
          >
            <QuestionMark width={28} height={28} />
          </TouchableOpacity>
        </TitleBox>
        <FunctionBox onPress={() => navigation.navigate('ManageMember', { teamId, teamCode, myAuthority })}>
          <ContentBox>
            <FunctionIcon source={require('../../assets/Imgs/set_member.png')} />
            <BodyBoldSm_Text>회원 관리</BodyBoldSm_Text>
          </ContentBox>
          <Right width={24} height={24} color={colors.primary_outline} />
        </FunctionBox>
        <FunctionBox onPress={() => navigation.navigate('ManagePet', { teamId })}>
          <ContentBox>
            <FunctionIcon source={require('../../assets/Imgs/set_pet.png')} />
            <BodyBoldSm_Text>펫 관리</BodyBoldSm_Text>
          </ContentBox>
          <Right width={24} height={24} color={colors.primary_outline} />
        </FunctionBox>
        <FunctionBox onPress={() => navigation.navigate('ManageTodo', { teamId })}>
          <ContentBox>
            <FunctionIcon source={require('../../assets/Imgs/set_category.png')} />
            <BodyBoldSm_Text>카테고리 관리</BodyBoldSm_Text>
          </ContentBox>
          <Right width={24} height={24} color={colors.primary_outline} />
        </FunctionBox>
        <FunctionBox onPress={() => setIsVisible(true)}>
          <ContentBox>
            <FunctionIcon source={require('../../assets/Imgs/set_noti.png')} />
            <BodyBoldSm_Text>공지 등록</BodyBoldSm_Text>
          </ContentBox>
          <Right width={24} height={24} color={colors.primary_outline} />
        </FunctionBox>
      </GroupContainer>
      <ModalPopUp petIcon={false} visible={isVisible} height={160}>
        <ModalHeader>
          <CloseButton onPress={() => setIsVisible(false)}>
            <Close width={24} height={24} />
          </CloseButton>
        </ModalHeader>
        <PopContent>
          <Body_Text color={colors.grey_700}>현재 공지 등록 기능은</Body_Text>
          <TextBase>
            <BodyBold_Text color={colors.red_300}>준비중</BodyBold_Text>
            <Body_Text color={colors.grey_700}>에 있습니다!</Body_Text>
          </TextBase>
        </PopContent>
      </ModalPopUp>
      <ModalPopUp petIcon={false} visible={isInfoVisible} height={160}>
        <ModalHeader style={{ marginBottom: 0 }}>
          <CloseButton onPress={() => setIsInfoVisible(false)}>
            <Close width={24} height={24} />
          </CloseButton>
        </ModalHeader>
        <PopContent style={{ alignItems: 'flex-start', marginBottom: 20 }}>
          <TopBox>
            <CrownTitle>
              <CrownIcon width={34} height={34} />
              <BodyBold_Text>관리자 권한</BodyBold_Text>
            </CrownTitle>
            <Detail_Text color={colors.secondary}>아래 내용은 Pamily의 관리자에게만 부여되는 권한입니다.</Detail_Text>
          </TopBox>
          <InfoBox>
            <NumBox>
              <Detail_Text color={colors.grey_100}>1</Detail_Text>
            </NumBox>
            <Contents>
              <Label_Text>회원 관리</Label_Text>
              <Detail_Text color={colors.grey_500}>관리자는 회원의 탈퇴 여부를 결정지을 수 있습니다.</Detail_Text>
            </Contents>
          </InfoBox>

          <InfoBox>
            <NumBox>
              <Detail_Text color={colors.grey_100}>2</Detail_Text>
            </NumBox>
            <Contents>
              <Label_Text>펫 관리</Label_Text>
              <Detail_Text color={colors.grey_500}>관리자는 펫의 등록 및 삭제가 가능합니다.</Detail_Text>
            </Contents>
          </InfoBox>
          <InfoBox>
            <NumBox>
              <Detail_Text color={colors.grey_100}>3</Detail_Text>
            </NumBox>
            <Contents>
              <Label_Text>카테고리 관리</Label_Text>
              <Detail_Text color={colors.grey_500}>관리자는 TODO의 카테고리를 설정할 수 있습니다.</Detail_Text>
            </Contents>
          </InfoBox>
          <InfoBox>
            <NumBox>
              <Detail_Text color={colors.grey_100}>4</Detail_Text>
            </NumBox>
            <Contents>
              <Label_Text>공지 등록</Label_Text>
              <Detail_Text color={colors.grey_500}>관리자는 모임의 전체 공지를 등록/관리할 수 있습니다.</Detail_Text>
            </Contents>
          </InfoBox>
        </PopContent>
      </ModalPopUp>
    </ScreenLayout>
  )
}
const ModalHeader = styled.View`
  width: '100%';
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 24px;
`
const TextBase = styled.View`
  flex-direction: row;
`
const PopContent = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`
const CloseButton = styled.TouchableOpacity``
const UserContainer = styled.View`
  padding: 12px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const ProfileImage = styled.Image`
  width: 78px;
  height: 78px;
  border-radius: 16px;
`
const UserDetailContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`
const UserBox = styled.View`
  justify-content: center;
  gap: 4px;
`
const EditBox = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  background-color: ${colors.grey_150};
  border-radius: 99px;
  justify-content: center;
  align-items: center;
`
const GroupContainer = styled.View`
  margin: 0px 16px;
  padding: 12px 0px;
  gap: 8px;
`
const GroupInfoContainer = styled.View`
  flex-direction: row;
  margin: 0px 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  margin-bottom: 15px;
`
const GroupInfoBox = styled.View`
  display: flex;
  padding: 10px 29px;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
`
const Bar = styled.View`
  width: 1px;
  background-color: rgba(0, 0, 0, 0.12);
`
const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const FunctionBox = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px 12px;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`
const FunctionIcon = styled.Image`
  width: 52px;
  height: 52px;
`
const ContentBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
const TopBox = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  gap: 8px;
`
const InfoBox = styled.View`
  margin: 16px 5px 0px 5px;
  flex-direction: row;
  gap: 10px;
`
const NumBox = styled.View`
  background-color: ${colors.grey_800};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`
const Contents = styled.View``
const CrownTitle = styled.View`
  align-items: center;
`
