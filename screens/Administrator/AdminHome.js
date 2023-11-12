import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ModalPopUp, ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text, BodyBold_Text, Body_Text, Detail_Text, SubHead_Text } from '../../components/Fonts'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import EditIcon from '../../assets/Svgs/Edit.svg'
import QuestionMark from '../../assets/Svgs/Question_mark.svg'
import Right from '../../assets/Svgs/chevron_right.svg'
import Close from '../../assets/Svgs/Close.svg'

export default function AdminHome({ navigation }) {
  const [name, setName] = useState('포잇')
  const [intro, setIntro] = useState('한줄소개')
  const [profileUrl, setProfileUrl] = useState(
    'https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/profileDefault.png',
  )
  const [memberNum, setMemberNum] = useState(9)
  const [petNum, setPetNum] = useState(3)
  const [isVisible, setIsVisible] = useState(false)

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
        <EditBox>
          <EditIcon width={16} height={16} color={'#4D4D4D'} />
        </EditBox>
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
          <TouchableOpacity>
            <QuestionMark width={28} height={28} />
          </TouchableOpacity>
        </TitleBox>
        <FunctionBox onPress={() => navigation.navigate('ManageMember')}>
          <ContentBox>
            <FunctionIcon source={require('../../assets/Imgs/set_member.png')} />
            <BodyBoldSm_Text>회원 관리</BodyBoldSm_Text>
          </ContentBox>
          <Right width={24} height={24} color={colors.primary_outline} />
        </FunctionBox>
        <FunctionBox onPress={() => navigation.navigate('ManagePetNav')}>
          <ContentBox>
            <FunctionIcon source={require('../../assets/Imgs/set_pet.png')} />
            <BodyBoldSm_Text>펫 관리</BodyBoldSm_Text>
          </ContentBox>
          <Right width={24} height={24} color={colors.primary_outline} />
        </FunctionBox>
        <FunctionBox onPress={() => navigation.navigate('ManageTodo')}>
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
  border-radius: 24px;
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
const EditBox = styled.View`
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
  border: 1px;
  border-radius: 8px;
  border-color: rgba(0, 0, 0, 0.12);
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
