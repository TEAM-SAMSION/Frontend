import { useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodyBoldSm_Text, BodyBold_Text, BodySm_Text, Detail_Text, SubHeadSm_Text, SubHead_Text } from '../Fonts'
import { ModalPopUp } from '../Shared'
import MoreIcon from '../../assets/Svgs/More.svg'
import CrownIcon from '../../assets/Svgs/Crown.svg'

export const MemberSearchBox = (props) => {
  const [visible, setVisible] = useState(false)

  const data = props.data
  const registerId = data.registerId
  const authority = data.authority
  const registerName = data.registerName
  const registerEmail = data.registerEmail

  return (
    <>
      <Card>
        <TeamContentBox>
          <TeamImage source={require('../../assets/Imgs/sample_5.png')} />
          <TeamInfoBox>
            <TeamInfoDetailBox>
              <Box>
                {authority == 'PRESIDENT' ? (
                  <>
                    <CrownIcon width={16} height={16} />
                    <Detail_Text color={colors.secondary}>관리자</Detail_Text>
                  </>
                ) : authority == 'MEMBER' ? (
                  ''
                ) : (
                  <Detail_Text color={colors.primary_outline}>운영진</Detail_Text>
                )}
              </Box>
            </TeamInfoDetailBox>
            <BodyBold_Text color={colors.grey_700}>{registerName}</BodyBold_Text>
            <BodySm_Text color={colors.grey_350}>{registerEmail}</BodySm_Text>
          </TeamInfoBox>
        </TeamContentBox>
        <MoreButton onPress={() => setVisible(true)}>
          <MoreIcon width={24} height={24} />
        </MoreButton>
      </Card>
      <ModalPopUp visible={visible} petIcon={false} height={217}>
        <PopButtonContainer>
          <PopButton
            onPress={() => {
              setVisible(false)
            }}
            style={{ backgroundColor: colors.grey_100, borderColor: colors.grey_150, borderWidth: 2 }}
          >
            <BodySm_Text color={colors.red_350}>권한 변경</BodySm_Text>
          </PopButton>
          <PopButton
            onPress={() => {
              setVisible(false)
            }}
          >
            <BodySm_Text color={colors.red_350}>내보내기</BodySm_Text>
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
  padding: 16px 0px;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`
const TeamCodeBox = styled.View``
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
