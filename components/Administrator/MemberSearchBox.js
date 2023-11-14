import { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodyBoldSm_Text, BodyBold_Text, BodySm_Text, Detail_Text, SubHeadSm_Text, SubHead_Text } from '../Fonts'
import { ModalPopUp } from '../Shared'
import MoreIcon from '../../assets/Svgs/More.svg'
import CrownIcon from '../../assets/Svgs/Crown.svg'
import { MemberPopUp } from './MemberPopUp'
import { changeAuthority } from './Apis'

export const MemberSearchBox = (props) => {
  const ACCESSTOKEN = props.accessToken
  const teamId = 1

  const [visible, setVisible] = useState(false)
  const [changeVisible, setChangeVisible] = useState(false)
  const [changing, setChanging] = useState('')
  const [changingToPresident, setChangingToPresident] = useState(false)
  const [changingToExecutive, setChangingToExecutive] = useState(false)
  const [changingToMember, setChangingToMember] = useState(false)

  const data = props.data
  const registerId = data.registerId
  const authority = data.authority
  const registerName = data.registerName
  const registerEmail = data.registerEmail
  const profileImage = data.profileImage

  const setAuthority = () => {
    console.log(changing)
    changeAuthority(ACCESSTOKEN, teamId, registerId, changing)
    // api 에러 !
  }

  return (
    <>
      <Card>
        <TeamContentBox>
          <TeamImage source={{ uri: profileImage }} />
          <TeamInfoBox>
            <TeamInfoDetailBox>
              {authority == 'PRESIDENT' ? (
                <Box>
                  <CrownIcon width={16} height={16} />
                  <Detail_Text color={colors.secondary}>관리자</Detail_Text>
                </Box>
              ) : authority == 'MEMBER' ? (
                ''
              ) : (
                <Box>
                  <Detail_Text color={colors.primary_outline}>운영진</Detail_Text>
                </Box>
              )}
            </TeamInfoDetailBox>
            <BodyBold_Text color={colors.grey_700}>{registerName}</BodyBold_Text>
            <BodySm_Text color={colors.grey_350}>{registerEmail}</BodySm_Text>
          </TeamInfoBox>
        </TeamContentBox>
        <MoreButton onPress={() => setVisible(true)}>
          <MoreIcon width={24} height={24} />
        </MoreButton>
      </Card>
      <MemberPopUp
        visible={visible}
        setVisible={setVisible}
        setChangeVisible={setChangeVisible}
        authority={authority}
      />
      <ModalPopUp visible={changeVisible} petIcon={false} height={258}>
        <PopContent>
          <BodyBold_Text>권한 변경</BodyBold_Text>
        </PopContent>
        <AuthorityContent>
          <AuthorityBox
            onPress={() => {
              setChangingToPresident(!changingToPresident)
              setChangingToExecutive(false)
              setChangingToMember(false)
              setChanging('PRESIDENT')
            }}
            style={{
              backgroundColor: changingToPresident ? colors.grey_150 : colors.grey_100,
            }}
          >
            <CrownIcon width={16} height={16} />
            <Detail_Text color={colors.secondary}>관리자</Detail_Text>
          </AuthorityBox>
          <AuthorityBox
            onPress={() => {
              setChangingToExecutive(!changingToExecutive)
              setChangingToPresident(false)
              setChangingToMember(false)
              setChanging('EXECUTIVE')
            }}
            style={{
              backgroundColor: changingToExecutive ? colors.grey_150 : colors.grey_100,
            }}
          >
            <Detail_Text color={colors.primary_outline}>운영진</Detail_Text>
          </AuthorityBox>
          <AuthorityBox
            onPress={() => {
              setChangingToMember(!changingToMember)
              setChangingToPresident(false)
              setChangingToExecutive(false)
              setChanging('MEMBER')
            }}
            style={{
              backgroundColor: changingToMember ? colors.grey_150 : colors.grey_100,
            }}
          >
            <Detail_Text color={colors.grey_600}>일반 멤버</Detail_Text>
          </AuthorityBox>
        </AuthorityContent>
        <PopButtonContainer>
          <PopButton
            onPress={() => {
              setChangeVisible(false)
            }}
            style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
          >
            <PopButtonText>취소</PopButtonText>
          </PopButton>
          <PopButton
            onPress={() => {
              setAuthority()
              setChangeVisible(false)
            }}
          >
            <PopButtonText>완료</PopButtonText>
          </PopButton>
        </PopButtonContainer>
      </ModalPopUp>
    </>
  )
}

const Card = styled.View`
  flex-direction: row;
  border-radius: 12px;
  background-color: ${colors.grey_100};
  padding: 10px 0px;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`
const TeamContentBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`
const TeamImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background-color: pink;
`
const TeamInfoBox = styled.View`
  gap: 2px;
`
const TeamInfoDetailBox = styled.View`
  flex-direction: row;
  margin-bottom: 6px;
`
const Box = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey_150};
  padding: 4px 6px;
  border-radius: 4px;
  gap: 8px;
`
const MoreButton = styled.TouchableOpacity``
////////
const PopContent = styled.View`
  align-items: center;
  margin-top: 8px;
  margin-bottom: 46px;
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
const PopButtonText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 14px;
  line-height: 19px;
  color: ${colors.red_350};
`
const AuthorityContent = styled.View`
  flex-direction: row;
  margin: 0px 20px;
  gap: 10px;
  margin-bottom: 48px;
`
const AuthorityBox = styled.TouchableOpacity`
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  height: 58px;
  flex: 1 0 0;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`
