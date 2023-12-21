import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ModalPopUp, ScreenHeight, ScreenLayout, ScreenWidth } from '../../components/Shared'
import {
  BodyBoldSm_Text,
  BodyBold_Text,
  BodySm_Text,
  Body_Text,
  Detail_Text,
  Label_Text,
  SubHead_Text,
} from '../../components/Fonts'
import { Pressable, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import EditIcon from '../../assets/Svgs/Edit.svg'
import QuestionMark from '../../assets/Svgs/Question_mark.svg'
import Right from '../../assets/Svgs/chevron_right.svg'
import Close from '../../assets/Svgs/Close.svg'
import { useIsFocused } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import { TabBarAtom } from '../../recoil/TabAtom'
import { getTeamInfo } from '../../components/Administrator/Apis'
import CrownIcon from '../../assets/Svgs/Crown.svg'
import BackButton from '../../assets/Svgs/chevron_back.svg'
import CloseIcon from '../../assets/Svgs/Close.svg'
import About1 from '../../assets/Svgs/about1.svg'

export default function TuAdmin1({ navigation }) {
  const isFocused = useIsFocused()
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)

  const [name, setName] = useState('모임이름')
  const [intro, setIntro] = useState('모임을 대표하는 한줄소개')
  const [profileUrl, setProfileUrl] = useState('https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/sample_5.png')
  const [memberNum, setMemberNum] = useState(9)
  const [petNum, setPetNum] = useState(3)
  const [teamCode, setTeamCode] = useState('asdf7890')
  const [isVisible, setIsVisible] = useState(false)
  const [isInfoVisible, setIsInfoVisible] = useState(false)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  return (
    <ScreenLayout>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          navigation.navigate('TuAdmin2')
        }}
      >
        <View
          style={{
            width: ScreenWidth,
            height: ScreenHeight,
            backgroundColor: 'rgba(8, 7, 7, 0.75)',
            position: 'absolute',
            zIndex: 99,
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 96 - 8,
              right: 16,
              borderWidth: 4,
              borderRadius: 99,
              borderColor: colors.primary_outline,
            }}
          >
            <EditBox style={{ width: 28, height: 28 }}>
              <EditIcon width={20} height={20} color={'#4D4D4D'} />
            </EditBox>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 116 - 12,
              right: 70,
              alignItems: 'flex-end',
            }}
          >
            <About1 widwth={20} hieght={20} />
            <View style={{ marginTop: 4 }}>
              <Body_Text color={colors.red_200} style={{ textAlign: 'right' }}>
                아이콘을 클릭하여
              </Body_Text>
              <Body_Text color={colors.red_200}>프로필을 편집할 수 있어요</Body_Text>
            </View>
          </View>
        </View>
        <TopNav>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BackButton width={24} height={24} />
          </TouchableOpacity>
          <BodyBold_Text color={colors.grey_600}>관리자 설정</BodyBold_Text>
          <View style={{ width: 24 }}></View>
        </TopNav>
        <UserContainer>
          <UserDetailContainer>
            <ProfileImage
              source={{
                uri: `${profileUrl}`,
              }}
            />
            <UserBox>
              <SubHead_Text>{name}</SubHead_Text>
              <BodySm_Text color={colors.grey_450}>{intro}</BodySm_Text>
            </UserBox>
          </UserDetailContainer>
          <EditBox>
            <EditIcon width={20} height={20} color={'#4D4D4D'} />
          </EditBox>
        </UserContainer>
        <GroupInfoContainer>
          <GroupInfoBox>
            <Body_Text color={colors.grey_500}>함께하는 Pamily</Body_Text>
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
            <BodyBold_Text>Pamily 관리 권한</BodyBold_Text>
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
      </Pressable>
      <View style={{ position: 'absolute', bottom: 52, left: ScreenWidth / 2 - 30, zIndex: 100 }}>
        <TouchableOpacity
          style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.navigate('AuthBridge')}
        >
          <CloseIcon width={36} height={36} color={colors.grey_200} />
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  )
}
const ModalHeader = styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
  width: '100%';
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
`
const TextBase = styled.View`
  flex-direction: row;
`
const PopContent = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 40px;
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
  width: 32px;
  height: 32px;
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
  padding: 10px 8px;
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
const TopNav = styled.View`
  flex-direction: row;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  margin: 0 16px;
`
