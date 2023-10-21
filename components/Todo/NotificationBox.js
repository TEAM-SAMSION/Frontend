import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodyBold_Text, Detail_Text } from '../Fonts'
import { NotificationButton } from '../../components/Buttons'
import Close from '../../assets/Svgs/Close.svg'

export const NotificationBox = () => {
  return (
    <NotificationBox>
      <TopContainer>
        <BodyBold_Text color={colors.grey_700}>{`지난주 보다 
  목표 달성률이 떨어졌어요!`}</BodyBold_Text>
        <CloseButton>
          <Close width={16} height={16} />
        </CloseButton>
      </TopContainer>
      <Detail_Text style={{ marginTop: 4, marginBottom: 24 }} color={colors.grey_500}>
        이번주 리포트를 더 자세히 함께 알아볼까요?
      </Detail_Text>
      <NotificationButton />
    </NotificationBox>
  )
}

const NotificationBox = styled.View`
  border-radius: 16px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8px;
  background-color: ${colors.blue_200};
`
const CloseButton = styled.TouchableOpacity``
